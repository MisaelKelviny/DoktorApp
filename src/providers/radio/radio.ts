import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RadioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RadioProvider {

  url: string;
  stream: any;
  promise: any;

  constructor() {
    // this.url = "http://akalmultimedia.net:8000/GDNSLDH";
    // this.url = "https://tunein.com/embed/player/s283044/";
    this.stream = new Audio(this.url);
    
  };

  play() {
    this.stream.play();
    this.promise = new Promise((resolve, reject) => {
      this.stream.addEventListener('playing', () => {
        resolve(true);
      });

      this.stream.addEventListener('error', () => {
        reject(false);
      });
    });

    return this.promise;
  };

  pause() {
    this.stream.pause();
  }

}