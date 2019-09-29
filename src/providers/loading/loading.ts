import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  loader: Loading;
  constructor(public loadingCtrl: LoadingController) {
    this.create();
  }

  create() {
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });
  }

  show() {
    return this.loader.present();
  }

  hide() {
    return this.loader.dismiss().then(() => this.create());
  }
}
