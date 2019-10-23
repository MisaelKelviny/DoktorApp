import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Keyboard, App, Platform, AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { CervejasPage } from '../pages/cervejas/cervejas';
import { CervejeirosPage } from '../pages/cervejeiros/cervejeiros';
import { AcompanhamentoPage } from '../pages/acompanhamento/acompanhamento';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { RadioPage } from '../pages/radio/radio';
import { CreditoPage } from '../pages/credito/credito';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public firebaseauth: AngularFireAuth,
    public menuCtrl: MenuController,
    public app: App,
    public platform: Platform,
    public alertCtrl: AlertController,
    public load: LoadingProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: HomePage, icon: "home" },
      { title: 'Comprar', component: ListPage, icon: "cart" },
      { title: 'Cervejas', component: CervejasPage, icon: "beer" },
      { title: 'Cervejeiros', component: CervejeirosPage, icon: "people" },
      { title: 'Acompanhamentos', component: AcompanhamentoPage, icon: "pizza" },
      { title: 'QR-Code', component: QrcodePage, icon: "qr-scanner" },
      { title: 'Rádio', component: RadioPage, icon: "radio" },
      { title: 'Créditos', component: CreditoPage, icon: "book" },
    ];
  }

  initializeApp() {

    window.addEventListener('popstate', () => {
      if (this.nav.canGoBack()) { //Can we go back?
        if (this.nav.length() > 2) { history.pushState(null, null, document.URL); }
        this.nav.pop();
      }
    });


    this.platform.registerBackButtonAction(() => {

      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();

      if (activeView.component.name === "HomePage") {
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Exit Application?',
            message: 'Do you want to exit the application?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Exit',
                handler: () => {
                  console.log('Exit clicked');
                }
              }
            ]
          });
          alert.present();
        }
      }
    });
  }

  sair() {
    console.log("sair")
    this.firebaseauth.auth.signOut()
      .then(() => {
        console.log("sair");        
        this.menuCtrl.close();
        this.nav.setRoot(LoginPage);
      })
      .catch((erro: any) => {
        console.log(erro);
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
