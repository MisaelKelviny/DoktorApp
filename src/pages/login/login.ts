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
  deferredPrompt;
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
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;

      // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;
    });

    //button click event to show the promt

    window.addEventListener('appinstalled', (event) => {
      console.log('installed');
    });


    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone');
    }
  }

  add_to_home(e) {
    // hide our user interface that shows our button
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
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
