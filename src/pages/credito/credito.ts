import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-credito',
  templateUrl: 'credito.html',
})
export class CreditoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditoPage');
  }

  onClickCancel() {
    this.navCtrl.pop();
  }

}
