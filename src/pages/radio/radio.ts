import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RadioProvider } from '../../providers/radio/radio';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-radio',
  templateUrl: 'radio.html'
})
export class RadioPage {
  player: any = "";
  toPlay: boolean = false;
  volume: any = 50;
  radioPlayer: any;
  getData: string;
  musicName: string = "";
  artistName: string = "";
  aux: boolean = false;

  constructor(public load: LoadingProvider, public navCtrl: NavController, public navParams: NavParams, public players: RadioProvider) {
    this.player = players;
    this.updateName();
  }

  ionViewDidEnter() {
    setInterval(() => {
      this.updateName();
    }, 5000);
  }

  setVolume(ev) {
    ev = (ev / 100);
    this.players.volume(ev);
  }

  play() {
    this.toPlay = !this.toPlay;
    this.player.play().then(() => {
      console.log('Playing');
    }).catch((error) => {
      console.log(error);
    })
  }

  pause() {
    this.toPlay = !this.toPlay;
    this.player.pause();
    console.log('Pause')
  }

  updateName() {
    this.players.getRadio().subscribe(
      (data) => {
        this.getData = data;
        this.verify(data.data[0].track.title, data.data[0].track.artist);
      }, (error) => alert(error)
    );

    console.log(this.getData);
  }

  verify(music, artist) {
    if (music !== this.musicName && artist !== this.artistName) {
      this.musicName = music;
      this.artistName = artist;
      this.aux = true;
    } else {
      this.aux = false;
    }
  }

}
