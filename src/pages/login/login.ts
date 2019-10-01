import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, Platform } from 'ionic-angular';
import { user } from '../../user';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showPwd: boolean = false;
  newUser = new user();
  user: user[] = [];
  passwd: string = "";
  login: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public toastCtrl: ToastController,
    public modal: ModalController,
    public load: LoadingProvider,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {
  }



  ionViewWillEnter() {
    this.load.hide();
  }

  public LoginComEmail(): void {
    this.load.show();
    this.login = this.login.trim();
    this.passwd = this.passwd.trim();

    if(!this.validateEmail(this.login)){
      this.presentAlert();
      this.load.hide();
    }else{ 
      this.firebaseauth.auth.signInWithEmailAndPassword(this.login, this.passwd)
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((erro: any) => {
        this.load.hide();
        this.exibirToast(erro);
      });
    }
  }

  register() {
    let profileModal = this.modal.create(RegistrationPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {
      console.log(data);
      this.cadastrarUsuario(data.mail, data.password);
    });
  }

  public cadastrarUsuario(login?: any, passwd?: any): void {
    console.log(login, passwd);
    this.firebaseauth.auth.createUserWithEmailAndPassword(login, passwd)
      .then(() => {
        this.exibirToast('Usuário criado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email Inválido',
      buttons: ['OK']
    });
    alert.present();
  }
}
