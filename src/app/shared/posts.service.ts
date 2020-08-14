import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import {
  Post,
  FirebaseCreateResponse,
} from './../admin/shared/interfaces/interfaces';
import { map } from 'rxjs/operators';

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
}
