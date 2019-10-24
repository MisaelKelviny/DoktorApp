import { Injectable, NgZone, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from './user';
import { LoginProvider } from './login';
import { NavController, Nav, App } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class AuthService {
    user: User;
    @ViewChild('content') nav: NavController
    public rootPage = LoginPage;

    constructor(
        private ngZone: NgZone,
        public afAuth: AngularFireAuth,
        public userservice: LoginProvider,
        public app: App
    ) {
        this.checkLocalStorage();
    }
    /*
     * If localStoge is empty, we call getDataFromFirebase
     * method set user data from firebase on localStorage
     */
    checkLocalStorage() {
        if (!localStorage.getItem('user')) {
            this.getDataFromFirebase();
        } else {
            console.log('localStorage ready!');
        }
    }
    /*
     * Call data from firebase and set data on local storage
     */
    getDataFromFirebase() {
        this.afAuth.authState.subscribe(auth => {
            if (auth) {
                this.user = auth; // save data firebase on user
                console.log('Authenticated');
                this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
            } else {
                console.log('Not authenticated');
            }
        });
    }
    /*
     * login with google
     */
    OnLogin(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    }

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth
            .signInWithPopup(provider)
            .then(data => {
                this.ngZone.run(() => {
                    this.nav.setRoot('HomePage').then()
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    logout(): boolean {
        let aux = false
        this.userservice.clearLocalStorage(); // Optional to clear localStorage
        this.afAuth.auth.signOut().then(() => {
            aux = true
        });
        return aux
    }
}