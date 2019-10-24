import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import { ToastController, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { User } from './user';

@Injectable()
export class LoginProvider {

	constructor() {}
	// Set data on localStorage
	setUserLoggedIn(user: User) {
	  localStorage.setItem('user', JSON.stringify(user));
	  console.log('saved on localStorage');
	}
	// get data on localStorage
	getUserLoggedIn() {
	  if (localStorage.getItem('user')) {
		JSON.parse(localStorage.getItem('user'));
	  } else {
		console.log('localStorage empty');
	  }
	}
	// Optional: clear localStorage
	clearLocalStorage() {
	  localStorage.clear();
	}

}