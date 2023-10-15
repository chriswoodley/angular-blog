import { Injectable, inject } from '@angular/core';
import { Post } from './post'
import { PostsResponse } from './posts-response';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http: HttpClient = inject(HttpClient)

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

  getPosts(): Observable<PostsResponse> {
    const response = this.http.get<PostsResponse>('https://dummyjson.com/posts')
      .pipe(
        tap(_ => console.log('fetched posts')),
        catchError(this.handleError<PostsResponse>(`getPosts`))
      );

    return response;
  }

  getPost(id: number): Observable<Post|undefined> {
    const response = this.http.get<Post>(`https://dummyjson.com/posts/${id}`)
      .pipe(
        tap(_ => console.log('fetched post')),
        catchError(this.handleError<Post|undefined>(`getPost id=${id}`))
      );

    return response;
  }
}
