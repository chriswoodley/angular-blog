import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient)

  constructor() { }

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

  getUser(id: number): Observable<User | undefined> {
    const response = this.http.get<User>(`https://dummyjson.com/users/${id}`)
      .pipe(
        tap(_ => console.log('fetched post')),
        catchError(this.handleError<User|undefined>(`getUser id=${id}`))
      );

    return response;
  }

  createUser(data: Partial<User>): Observable<Partial<User> | undefined> {
    console.log({data})
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const response = this.http.post<Partial<User>>(
      `https://dummyjson.com/users/add`,{
        body,
        httpOptions
      })
      .pipe(
        tap(_ => console.log('create user')),
        catchError(this.handleError<User|undefined>(`createUser`))
      );

    return response;
  }
}
