import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { AuthUser } from './auth-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error({error}); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');

    return of(!this.authUser);
  }

  login(credentials: object): Observable<AuthUser> {
    const body = JSON.stringify(credentials);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const response = this.http.post<AuthUser>(
      'https://dummyjson.com/auth/login',
      body,
      httpOptions
    ).pipe(
      tap(_ => console.log('auth login')),
      catchError(this.handleError<any>('auth/login'))
    );

    return response;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  get authUser(): AuthUser|undefined {
    try {
      const token = this.getToken();

      if (token) {
        return JSON.parse(atob(token.split('.')[1]));
      }

      return undefined;
    } catch {
      return undefined;
    }
  }
}
