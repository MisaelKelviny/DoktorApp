import { Injectable } from '@angular/core';
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