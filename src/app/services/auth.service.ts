import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(){
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        data.user?.getIdToken().then(value => {
          sessionStorage.setItem('token', value);
          resolve('ok');
        })
      })
      .catch(err => {
        reject(err);
      });
    })
  }

  getToken(){
    let token = sessionStorage.getItem('token');
    return token ? true : false;
  }

}
