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

  loginUser(){
    
  }

  loginWithGoogle() {
    this.load.show()
    this.login = this.login.trim()
    this.passwd = this.passwd.trim()

    if(!this.validateEmail(this.login)){
      this.load.hide()
      this.presentAlert();
    }else{
      this.authservice.OnLogin(this.login, this.passwd).then((res)=>{
        this.navCtrl.push(HomePage);
      }).catch((erro) => {
        this.presentAlert();
        this.load.hide() 
      })
    }

  }


  ionViewWillEnter() {
    this.load.hide();
  }

  
  register() {
    let profileModal = this.modal.create(RegistrationPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {
      this.userName = data.user.email;
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
}
