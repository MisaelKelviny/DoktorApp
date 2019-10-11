
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Http, Response } from "@angular/http";

@Injectable()
export class RadioProvider {

  url: string;
  stream: any;
  musicName: any;
  promise: any;
  radioStream: any = "http://sc15.shoutcaststreaming.us:8140/;listen.pls?sid=1";

  constructor(public http: HttpClient, public httpservice: Http) {
    this.url = "http://live.hunter.fm/rock32";
    // this.url = "http://sc15.shoutcaststreaming.us:8140/;listen.pls?sid=1"; 
    // this.url = "https://control.internet-radio.com:2199/external/rpc.php?&m=streaminfo.get&username=xxxrock&charset=&mountpoint=&rid=xxxrock&_=1570761967406";
    this.stream = new Audio(this.url);
  };

  getRadio() {
    return this.httpservice.get(this.url).map(res => res.json());
  }

  volume(value){
    this.stream.volume = value;
  }

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