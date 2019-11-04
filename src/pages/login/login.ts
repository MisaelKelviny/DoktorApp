import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, Platform } from 'ionic-angular';
import { user } from '../../user';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { AuthService } from '../../providers/login/auth';

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
  userName: string = "";
  showBtn: boolean = false;
  deferredPrompt: any;
  private _userLogged: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public toastCtrl: ToastController,
    public modal: ModalController,
    public load: LoadingProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    private authservice: AuthService
  ) {
  }

  ngOnInit() {
    /*
      If localstorage have user key, redirected to dashboard
    */
    if (localStorage.getItem('user')) {
      this.navCtrl.setRoot(HomePage)
    }
  }

  public get userLogged(): any {
    return this._userLogged;
  }
  public set userLogged(value: any) {
    this._userLogged = value;
  }



  loginWithGoogle() {
    this.load.show()
    this.login = this.login.trim()
    this.passwd = this.passwd.trim()

    if (!this.validateEmail(this.login)) {
      this.load.hide()
      this.presentAlert();
    } else {
      this.authservice.OnLogin(this.login, this.passwd).then((res) => {
        this.navCtrl.push(HomePage);
      }).catch((erro) => {
        this.presentAlert();
        this.load.hide()
      })
    }

  }

  register() {
    let profileModal = this.modal.create(RegistrationPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {
      console.log(data);
      this.userName = data.mail;
      this.cadastrarUsuario(data.mail, data.password);
    });
  }

  public cadastrarUsuario(login?: any, passwd?: any): void {
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
      title: 'Email ou Senha Inválido',
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewWillEnter() {
    this.load.hide();
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.add_to_home(e)
      this.deferredPrompt = e;
      this.showBtn = true;
    });
    window.addEventListener('appinstalled', (event) => {
      console.log('installed');
    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone');
    }
  }

  add_to_home(e) {
    if(this.deferredPrompt){
      this.deferredPrompt.prompt();
    }
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the prompt');
        } else {
          console.log('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  };

}
