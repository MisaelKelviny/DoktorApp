import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CervejeirosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cervejeiros',
  templateUrl: 'cervejeiros.html',
})
export class CervejeirosPage {


  // data = {
  //   bebidas: [
  //     {
  //       beer: [
  //         {
  //           name: "SORO N'AVEIA",
  //           beerUrl: "../../assets/soronaveia-min.png",
  //           coments: [
  //             {
  //               rating: 3,
  //               userComment: "O amargor na dosagem certa #amelhorcerveja",
  //               username: "HelderFernandes",
  //             },
  //             {
  //               rating: 4,
  //               username: "HelderFernandes",
  //               userComment: "O amargor na dosagem certa #amelhorcerveja",
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       beer: [
  //         {
  //           name: "PSICOTIPA",
  //           beerUrl: "../../assets/Psicopatipa-min.png",
  //           coments: [
  //             {
  //               rating: 5,
  //               userComment: "O amargor na dosagem certa #amelhorcerveja",
  //               username: "HelderFernandes",
  //             },
  //             {
  //               rating: 5,
  //               username: "HelderFernandes",
  //               userComment: "O amargor na dosagem certa #amelhorcerveja",
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //   ]
  // }

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
  }

  enviar() {
  }

  logRatingChange(event) {
    return event;
  }


}
