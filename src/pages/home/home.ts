import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { CervejasPage } from '../cervejas/cervejas';
import { AcompanhamentoPage } from '../acompanhamento/acompanhamento';
import { CervejeirosPage } from '../cervejeiros/cervejeiros';
import { RadioPage } from '../radio/radio';
import { QrcodePage } from '../qrcode/qrcode';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public unsubscribeBackEvent: any;

  constructor(public navCtrl: NavController, public platform: Platform, public load: LoadingProvider) {
    
  }

  ionViewDidEnter(){
    this.load.hide();
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();

    history.pushState(null, null, document.URL);
    console.log("leave home ,add pushState");
  }

  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.registerBackButtonAction(function (event) {
    }, 101);
  }

  openPage(page) {
    if (page == "Cervejas") {
      this.navCtrl.push(CervejasPage);
    }
    if (page == "Acompanhamento") {
      this.navCtrl.push(AcompanhamentoPage);
    }
    if (page == "Cervejeiros") {
      this.navCtrl.push(CervejeirosPage);
    }
    if (page == "Rádio") {
      this.navCtrl.push(RadioPage);
    }
    if (page == "QR-Code") {
      this.navCtrl.push(QrcodePage);
    }
    if (page == "Comprar") {
      this.navCtrl.push(ListPage);
    }
  }


}
