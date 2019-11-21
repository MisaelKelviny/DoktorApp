import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail, Slides, Events, Content } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { compareDates } from 'ionic-angular/umd/util/datetime-util';
import { TestProvider } from '../../providers/test/test';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading/loading';


@IonicPage()
@Component({
  selector: 'page-cervejeiros',
  templateUrl: 'cervejeiros.html',
})
export class CervejeirosPage {

  @ViewChild(Content) content: Content;
  @ViewChild('slide') slides: Slides;
  private PATH = '/comments';
  stars: any = 3;
  indexOfSlide: any = 0;
  coment: any = "";
  dataComment: any;
  user: any;
  auxiliar: any
  data: any = {
    item: [
      {
        name: "SORO N'AVEIA",
        beerUrl: "../../assets/soronaveia-min.png",
        userComment: [
          { coment: "O sai do nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "ANESTHES'IPA",
        beerUrl: "../../assets/Anesthetipa-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O sai do nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "WITAMINA",
        beerUrl: "../../assets/1-WitAmina-3D_500_ML_00000-min.png",
        userComment: [
          { coment: "O sai do nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "MEDIKA'MENTHUS",
        beerUrl: "../../assets/5-Madikamentus-3D_500_ML_00000-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O sai do nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "PSICOT'IPA",
        beerUrl: "../../assets/Psicopatipa-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O sai do nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "PSICOSE ESPACIAL",
        beerUrl: "../../assets/psicose-espacial-lata-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
        ],
      },
      {
        name: "HEMORRAG'IPA",
        beerUrl: "../../assets/Hemorragipa-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "O nada na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "Melhor cerveja que já pude experimentar #amelhorcerveja", username: "HelderFernandes", rating: 4 },
          { coment: "Muito bom #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "NOCTURIA",
        beerUrl: "../../assets/garrafa-nocturia-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 3 },
          { coment: "Na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 4 },
        ],
      },
      {
        name: "ALBINUS",
        beerUrl: "../../assets/garrafa-albinus-min.png",
        userComment: [
          { coment: "Muito Bom mesmo a cerveja Albinus", username: "user", rating: 5 },
          { coment: "#amelhorcerveja", username: "joao.oliveira", rating: 5 },
        ]
      },
      {
        name: "TOC",
        beerUrl: "../../assets/garrafa-toc-min.png",
        userComment: [
          { coment: "O amargor na dosagem certa #amelhorcerveja", username: "HelderFernandes", rating: 5 },
        ],
      }
    ]
  }



  constructor(
    private db: AngularFireDatabase,
    public database: TestProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: LoginProvider,
  ) {
    this.getUserLoggedIn();
    // this.data.item.push(JSON.parse(localStorage.getItem("comentario")))
    if (localStorage.getItem("comentario")) {
      this.data = JSON.parse(localStorage.getItem("comentario"))
    }
    this.auxiliar = this.data.item
  }

  getBeforePlus(str) {
    return str.substring(0, str.indexOf("@"));
  }

  ngOnInit() {

  }

  getUserLoggedIn() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage empty');
    }
  }

  indexNow(e) {
    this.indexOfSlide = e.realIndex
  }

  enviar(coment) {
    this.content.scrollToBottom()
    var indexAgora = this.indexOfSlide;
    let comentario = {
      username: this.getBeforePlus(this.user.email),
      coment: coment,
      rating: this.stars
    }
    let bebida = this.data.item[indexAgora].name
    this.data.item.map(function (e) {
      if (bebida == e.name) {
        e.userComment.push({
          coment: comentario.coment,
          username: comentario.username,
          rating: comentario.rating
        })
      }
    })
    this.coment = ""
    localStorage.setItem("comentario", JSON.stringify(this.data));
  }

  logRatingChange(event) {
    this.stars = event
    return event;
  }


  getItems(ev) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.data.item = this.auxiliar;
      this.data.item = this.data.item.filter((evento) => {
        return (evento.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.data.item = this.auxiliar;
    }
  }
}
