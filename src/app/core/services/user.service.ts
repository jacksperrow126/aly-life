import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user/user.model';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { backEndUrl, apiRoutes } from './api';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;
  public userChange = new BehaviorSubject(null);
  constructor(private store: Storage, private http: HttpClient) {}

  logIn(user: User) {
    return this.http.post(backEndUrl + apiRoutes.user.login, user);
  }

  createUser(user: User) {
    return this.http.post(backEndUrl + apiRoutes.user.create, user);
  }

  saveUser(user: User) {
    this.user = user;
    this.store.ready().then(() => {
      this.store.set('user', this.user).then();
    });
  }

  getUser() {
    this.store.ready().then(async () => {
      this.store.get('user').then((data) => {
        if (data !== undefined || null) {
          this.user = data;
        }
      });
    });
  }

  updateName(name: string) {
    this.user.name = name;
    this.userChange.next(this.user);
    this.saveUser(this.user);
  }

  updatePassword(password: string) {
    this.user.password = password;
    this.userChange.next(this.user);
    this.saveUser(this.user);
  }

  updateAvatar(avatar: string) {
    this.user.avatar = avatar;
    this.userChange.next(this.user);
    this.saveUser(this.user);
  }
}
