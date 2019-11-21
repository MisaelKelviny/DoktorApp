import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

@Component({
	selector: 'page-registration',
	templateUrl: 'registration.html',
})
export class RegistrationPage {

	login: String = "";
	passwd: String = "";


	constructor(public viewCtrl: ViewController, private navCtrl: NavController, public alertCtrl: AlertController) { }

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	cadastrar(mail, password) {
		mail = mail.trim();
		password = password.trim();

		if (!this.validateEmail(mail)) {
			this.presentAlert()
		} else {
			if (mail == '') {
				mail = ""
			} if (password == '') {
				password = ""
			}
			else {
				this.viewCtrl.dismiss({ mail: mail != "" ? mail : "", password: password != "" ? password : "" });
			}
		}
	}

	presentAlert() {
		let alert = this.alertCtrl.create({
			title: 'Email Inválido',
			buttons: ['OK']
		});
		alert.present();
	}

	onClickCancel() {
		this.navCtrl.pop();
	}
}