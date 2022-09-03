import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import { IUser } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser = {} as IUser;

  constructor(private afAuth: AngularFireAuth) { 
    this.getUser();
  }

  getUser(){
    return this.afAuth.authState.subscribe(user => {
      console.log(user);
      if(!user){
        return;
      }
      this.user.uid = user.uid;
      this.user.name = user.displayName;
      this.user.email = user.email;
    })
  }


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

  logout(){
    sessionStorage.removeItem('token');
    return this.afAuth.signOut();
  }
}
