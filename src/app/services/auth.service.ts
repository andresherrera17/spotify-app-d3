import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser = {} as IUser;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { 
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
          this.getTokenSpotify();
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


  getTokenSpotify(){
    let body = new URLSearchParams();
    body.set('grant_type', environment.spotify.grant_type);
    body.set('client_id', environment.spotify.client_id);
    body.set('client_secret', environment.spotify.client_secret);

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(environment.spotify.urlToken, body.toString(), {headers})
      .subscribe((data:any) => {
        sessionStorage.setItem('tokenSpotify', data?.access_token);
      })
  }

  getNewReleases(){
    return this.http.get<any[]>(`${environment.spotify.url}/browse/new-releases?limit=20`)
  }
}
