import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CervejeirosPage } from '../cervejeiros/cervejeiros';
import { AcompanhamentoPage } from '../acompanhamento/acompanhamento';

/**
 * Generated class for the CervejasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cervejas',
  templateUrl: 'cervejas.html',
})
export class CervejasPage {

  @ViewChild('slides') slides: Slides;
  amargor: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CervejasPage');
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  setLabel(value){
    console.log(value);
    this.slides.slideTo(value);
  }

  openComprar(){
    this.navCtrl.push(ListPage)
  }

  openCervejeiro(){
    this.navCtrl.push(CervejeirosPage)
  }

  openAcompanhamento(){
    this.navCtrl.push(AcompanhamentoPage)
  }
}
