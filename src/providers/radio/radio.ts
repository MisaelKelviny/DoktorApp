
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
  radioStream: string;
  
  // radioStream: any = "https://tunein.com/embed/player/s157559/";
  // radioStream: any = "http://45.79.92.185/proxy/xxxrock?mp=/stream"
  // radioStream = "http://live.hunter.fm/rock32";
  
  constructor(public http: HttpClient, public httpservice: Http) {
    this.radioStream  = "http://sc15.shoutcaststreaming.us:8140/stream?type=http&nocache=300701";
    // this.url = "https://feed.tunein.com/profiles/s157559/nowPlaying?token=eyJwIjpmYWxzZSwidCI6IjIwMTktMTAtMTJUMDI6MzI6MjkuOTA4MTA4NloifQ&itemToken=BgUFAAAAAAAAAAAAAAABd2cCAAEFAXdnAgABd2cCAA&formats=mp3,aac,ogg,flash&serial=01b140e8-a1de-48b2-b934-0a303cd46d98&partnerId=qZjjnm85&version=0.32&itemUrlScheme=secure&mode=embed&reqAttempt=1";
    // this.url = "http://sc15.shoutcaststreaming.us:8140/;listen.pls?sid=1"; 
    this.url = "https://control.internet-radio.com:2199/external/rpc.php?&m=streaminfo.get&username=xxxrock&charset=&mountpoint=&rid=xxxrock&_=1570761967406";
    this.stream = new Audio(this.radioStream);
  };

  getRadio() {
    return this.httpservice.get(this.url).map(res => res.json());
  }

  volume(value) {
    this.stream.volume = value;
  }

  play() {
    this.stream.autoPlay = false;
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