import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import { ToastController, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

	private user: firebase.User;
	userEmail: any;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe((authState) => {
			if (authState) {
				this.user = authState
				this.userEmail = authState.email;
			}
		});
	}
	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.afAuth.auth.getRedirectResult().then(result => {
						// This gives you a Google Access Token.
						// You can use it to access the Google API.
						// let token = result.credential.accessToken;
						// The signed-in user info.
						let user = result.user;
						// console.log(token, user);
					}).catch(function (error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}

}