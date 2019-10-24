import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Keyboard, App, Platform, AlertController, NavController } from 'ionic-angular';

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
import { User } from '../providers/login/user';
import { AuthService } from '../providers/login/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild('content') nav: NavController
  public rootPage = LoginPage;
  
  user: User;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public firebaseauth: AngularFireAuth,
    public authservice: AuthService,
    public menuCtrl: MenuController,
    public app: App,
    public platform: Platform,
    public alertCtrl: AlertController,
    public load: LoadingProvider) {
      this.getUserLoggedIn();
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


  ngOnInit() {
    
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  openPage(page){
    this.nav.push(page.component);
  }

  logout() {
    if(this.authservice.logout()){
      this.menuCtrl.close()
      this.nav.setRoot(LoginPage)
      console.log("deu certo")
    }else{
      this.menuCtrl.close()
      this.nav.setRoot(LoginPage)
      console.log("nao deu certo")
    }

    console.log('Logged out');
  }
}
