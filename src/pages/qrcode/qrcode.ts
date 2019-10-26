import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  scannedText: string;
  scanSub: any;
  // qrScanner: any = QRScanner;

  constructor(
    public navCtrl: NavController,
  ) {
    this.scannedText = '';
  }

  onClickCancel() {
    this.navCtrl.pop();
  }

  showCamera() {
    
  }

  hideCamera() {
   
  }

  stopScan() {
  }

  doScan() {
   
  }

  ionViewWillLeave() {
    // this.hideCamera();
    // this.stopScan();
  }

  // ionViewDidEnter(){
  //   this.showCamera();
  //   this.doScan();
  // }
}
