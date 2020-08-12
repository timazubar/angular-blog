import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { User, FireBaseAuthResponse } from './../interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}
    `,
        user
      )
      .pipe(tap(this.setToken));
  }
  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(res: FireBaseAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      console.log(res);
    } else {
      localStorage.clear();
    }
  }
}
