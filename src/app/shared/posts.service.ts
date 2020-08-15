import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Post,
  FirebaseCreateResponse,
} from './../admin/shared/interfaces/interfaces';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fireBaseDbUrl}/posts.json`, post).pipe(
      map((response: FirebaseCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fireBaseDbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get(`${environment.fireBaseDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return { ...post, id, date: new Date(post.date) };
      })
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.fireBaseDbUrl}/posts/${id}.json`
    );
  }
}
