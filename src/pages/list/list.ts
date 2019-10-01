import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadedModule } from 'ionic-angular/umd/util/module-loader';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  doktorBeer = [
    {
      cerveja: "SORO N'AVEIA",
      type: "garrafa",
      url: "../../assets/soronaveia.png"
    },
    {
      cerveja: "PSICOT'IPA",
      type: "garrafa",
      url: "../../assets/Psicopatipa.png"
    },
    {
      cerveja: "HEMORRAG'IPA",
      type: "garrafa",
      url: "../../assets/Hemorragipa.png"
    },
    {
      cerveja: "ANESTHES'IPA",
      type: "garrafa",
      url: "../../assets/Anesthetipa.png"
    },
    {
      cerveja: "MEDIKA'MENTHUS",
      type: "garrafa",
      url: "../../assets/5-Madikamentus-3D_500_ML_00000.png"
    },
    {
      cerveja: "WITAMINA",
      type: "garrafa",
      url: "../../assets/1-WitAmina-3D_500_ML_00000.png"
    },
    {
      cerveja: "ENDORPHINA",
      type: "lata",
      url: "../../assets/lata-endorphina.png"
    },
    {
      cerveja: "NOCTURIA",
      type: "garrafa",
      url: "../../assets/garrafa-nocturia.png"
    },
    {
      cerveja: "PSICOSE ESPACIAL",
      type: "lata",
      url: "../../assets/psicose-espacial-lata.png"
    },
    {
      cerveja: "SEROTHONINA",
      type: "lata",
      url: "../../assets/lataserotonina.png"
    },
    {
      cerveja: "ALBINUS",
      type: "garrafa",
      url: "../../assets/garrafa-albinus.png"
    },
    {
      cerveja: "TOC",
      type: "garrafa",
      url: "../../assets/garrafa-toc.png"
    },
    {
      cerveja: "PILSEN",
      type: "garrafa",
      url: "../../assets/garrafa-pilsen.png"
    },
    {
      cerveja: "WEISS",
      type: "garrafa",
      url: "../../assets/garrafa-weiss.png"
    },]

  constructor(public navCtrl: NavController, public navParams: NavParams, public load: LoadingProvider) {

  }

  ngOnInit() {
  }

}
