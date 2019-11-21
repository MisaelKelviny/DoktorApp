import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  aux: any;
  doktorBeer = [
    {
      cerveja: "SORO N'AVEIA",
      type: "garrafa",
      url: "../../assets/soronaveia-min.png"
    },
    {
      cerveja: "PSICOT'IPA",
      type: "garrafa",
      url: "../../assets/Psicopatipa-min.png"
    },
    {
      cerveja: "HEMORRAG'IPA",
      type: "garrafa",
      url: "../../assets/Hemorragipa-min.png"
    },
    {
      cerveja: "ANESTHES'IPA",
      type: "garrafa",
      url: "../../assets/Anesthetipa-min.png"
    },
    {
      cerveja: "MEDIKA'MENTHUS",
      type: "garrafa",
      url: "../../assets/5-Madikamentus-3D_500_ML_00000-min.png"
    },
    {
      cerveja: "WITAMINA",
      type: "garrafa",
      url: "../../assets/1-WitAmina-3D_500_ML_00000-min.png"
    },
    {
      cerveja: "ENDORPHINA",
      type: "lata",
      url: "../../assets/lata-endorphina-min.png"
    },
    {
      cerveja: "NOCTURIA",
      type: "garrafa",
      url: "../../assets/garrafa-nocturia-min.png"
    },
    {
      cerveja: "PSICOSE ESPACIAL",
      type: "lata",
      url: "../../assets/psicose-espacial-lata-min.png"
    },
    {
      cerveja: "SEROTHONINA",
      type: "lata",
      url: "../../assets/lataserotonina-min.png"
    },
    {
      cerveja: "ALBINUS",
      type: "garrafa",
      url: "../../assets/garrafa-albinus-min.png"
    },
    {
      cerveja: "TOC",
      type: "garrafa",
      url: "../../assets/garrafa-toc-min.png"
    },
    {
      cerveja: "PILSEN",
      type: "garrafa",
      url: "../../assets/garrafa-pilsen-min.png"
    },
    {
      cerveja: "WEISS",
      type: "garrafa",
      url: "../../assets/garrafa-weiss-min.png"
    },
  ]

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public load: LoadingProvider) {
      this.aux = this.doktorBeer
  }

  ngOnInit() {
  }


  buy(){
    this.presentAlert()
  }

  presentAlert() {
		let alert = this.alertCtrl.create({
      title: 'Compra Realizada',
      message: 'Compra efetuada com sucesso!',
			buttons: ['OK']
		});
		alert.present();
	}

  getItems(ev){
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.doktorBeer = this.aux;
      this.doktorBeer = this.doktorBeer.filter((evento) => {
        return (evento.cerveja.toLowerCase().indexOf(val.toLowerCase()) > -1 || evento.type.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.doktorBeer = this.aux;
    }
  }
}
