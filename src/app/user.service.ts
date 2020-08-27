import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    // By default, the AngularFireObject is a service for manipulating and streaming object data
    // We've used valueChanges() to unwrap the Firebase DataSnapshot
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
