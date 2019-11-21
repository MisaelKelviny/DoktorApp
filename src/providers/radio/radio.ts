import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Http, Response } from "@angular/http";
import { User } from '../login/user';

@Injectable()
export class RadioProvider {

  i:any=0;
  url: string;
  stream: any;
  musicName: any;
  promise: any;
  radioStream = ["http://live.hunter.fm/rock32", "https://servidor29-3.brlogic.com:8586/live", "https://live.hunter.fm/pop2k32"];
  user: User
  
  constructor(public http: HttpClient, public httpservice: Http) {
     this.stream = new Audio(this.radioStream[0]);
  };

  volume(value) {
    this.stream.volume = value;
  }

  next(){
    
    if(this.i >= 2){
      this.i = 0;
    }else{
      this.i++
    }
    console.log(this.i)
    this.stream = new Audio(this.radioStream[this.i]);
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