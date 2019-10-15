import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cervejeiros',
  templateUrl: 'cervejeiros.html',
})
export class CervejeirosPage {

  data = [
    {
      name: "SORO N'AVEIA",
      beerUrl: "../../assets/soronaveia-min.png",
      rating: 3,
      userComment: "O amargor na dosagem certa #amelhorcerveja",
      username: "HelderFernandes",
    },
    {
      name: "PSICOTIPA",
      beerUrl: "../../assets/Psicopatipa-min.png",
      rating: 3,
      userComment: "O amargor na dosagem certa #amelhorcerveja",
      username: "HelderFernandes",
    }
  ]
  coment: any = "";
  dataComment: any


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // console.log(this.);
  }

  enviar() {
  }

  logRatingChange(event) {
    return event;
  }


}
