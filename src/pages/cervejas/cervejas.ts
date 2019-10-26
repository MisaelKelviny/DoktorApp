import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CervejeirosPage } from '../cervejeiros/cervejeiros';
import { AcompanhamentoPage } from '../acompanhamento/acompanhamento';
import { User } from '../../providers/login/user';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-cervejas',
  templateUrl: 'cervejas.html',
})
export class CervejasPage implements OnInit{

  @ViewChild('slides') slides: Slides;
  amargor: any = 0;
  userLogged: any
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: LoginProvider) {
  }
  
  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CervejasPage');
  }

  next() {
    this.slides.slideNext()
  }


  prev() {
    this.slides.slidePrev()
  }

  setRange(event){
    this.amargor = event.realIndex
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
