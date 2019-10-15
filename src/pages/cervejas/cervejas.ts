import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CervejeirosPage } from '../cervejeiros/cervejeiros';
import { AcompanhamentoPage } from '../acompanhamento/acompanhamento';

@IonicPage()
@Component({
  selector: 'page-cervejas',
  templateUrl: 'cervejas.html',
})
export class CervejasPage implements OnInit{

  @ViewChild('slides') slides: Slides;
  amargor: any = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    // this.slides.lockSwipes(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CervejasPage');
  }

  next() {
    this.slides.slideNext()
    this.amargor < 4 ? this.amargor++ : this.amargor;
  }


  prev() {
    this.slides.slidePrev()
    this.amargor >= 0 ? this.amargor-- : this.amargor;
  }

  setLabel(value){
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
