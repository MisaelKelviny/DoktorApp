import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RadioProvider } from '../../providers/radio/radio';
import { ChangeDetectorRef } from '@angular/core'
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
  musicName: string;
  artistName: string;

  constructor(private changeRef: ChangeDetectorRef, public load: LoadingProvider, public navCtrl: NavController, public navParams: NavParams, public players: RadioProvider) {
    this.player = players;
  }

  ionViewDidEnter() {
    this.players.getRadio().subscribe(
      (data) =>  {
        this.getData = data.data;  
        this.changeRef.detectChanges();
        this.musicName = data.data[0].track.title;
        this.artistName = data.data[0].track.artist;
      },(error) => alert(error), 
      () => {
        console.log(this.getData)},
    );
  }

  setVolume(ev){
    ev = (ev / 100);
    this.players.volume(ev);
  }

  play() {
    this.toPlay = !this.toPlay;
    this.player.play().then(() => {
      console.log('Playing');
    })
  }

  pause() {
    this.toPlay = !this.toPlay;
    this.player.pause();
    console.log('Pause')
  }
}
