import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RadioProvider } from '../../providers/radio/radio';

@IonicPage()
@Component({
  selector: 'page-radio',
  templateUrl: 'radio.html'
})
export class RadioPage {
  player:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public players: RadioProvider) {
    this.player = players;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RadioPage');
  }

  play() {
    this.player.play().then(() => {
      console.log('Playing');
    });
  }

  pause() {
    this.player.pause();
    console.log('Pause')
  }
}
