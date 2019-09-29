import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Keyboard } from 'ionic-angular';

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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon:string}>;

  constructor(public firebaseauth: AngularFireAuth, 
    public menuCtrl: MenuController, 
    public load: LoadingProvider) {
    // this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon: "home" },
      { title: 'Comprar', component: ListPage, icon: "cart" },
      { title: 'Cervejas', component: CervejasPage, icon: "beer" },
      { title: 'Cervejeiros', component: CervejeirosPage, icon: "people" },
      { title: 'Acompanhamentos', component: AcompanhamentoPage, icon: "pizza" },
      { title: 'QR-Code', component: QrcodePage, icon: "qr-scanner" },
      { title: 'Rádio', component: RadioPage, icon: "radio" },
    ];
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  public sair(): void {
    this.load.show();
    this.firebaseauth.auth.signOut()
      .then(() => {
        this.menuCtrl.close();
        this.nav.setRoot(LoginPage);
        this.load.hide();
      })
      .catch((erro: any) => {
        console.log(erro);
        this.load.hide();
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
