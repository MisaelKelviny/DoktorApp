import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CervejasPage } from '../pages/cervejas/cervejas';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { CervejeirosPage } from '../pages/cervejeiros/cervejeiros';
import { RadioPage } from '../pages/radio/radio';
import { AcompanhamentoPage } from '../pages/acompanhamento/acompanhamento';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginProvider } from '../providers/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { LoadingProvider } from '../providers/loading/loading';
import { CervejasPageModule } from '../pages/cervejas/cervejas.module';
import { CervejeirosPageModule } from '../pages/cervejeiros/cervejeiros.module';
import { AcompanhamentoPageModule } from '../pages/acompanhamento/acompanhamento.module';
import { QrcodePageModule } from '../pages/qrcode/qrcode.module';
import { RadioPageModule } from '../pages/radio/radio.module';
import { RegistrationPageModule } from '../pages/registration/registration.module';
import { LoginPageModule } from '../pages/login/login.module';

export const firebaseConfig = {
  apiKey: "AIzaSyBdoKnXX4CqTb6xgEJpScYXscizbOV7jHA",
  authDomain: "doktorpwa.firebaseapp.com",
  databaseURL: "https://doktorpwa.firebaseio.com//user/En44gJngeFAqHmDapDcA",
  projectId: "doktorpwa",
  storageBucket: "doktorpwa.appspot.com",
  messagingSenderId: "281372735697",
  appId: "1:281372735697:web:4fb024aa60a94e7a1aadf0"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgxErrorsModule,
    CervejasPageModule,
    CervejeirosPageModule,
    AcompanhamentoPageModule,
    QrcodePageModule,
    RadioPageModule,
    RegistrationPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    LoadingProvider
  ]
})
export class AppModule { }
