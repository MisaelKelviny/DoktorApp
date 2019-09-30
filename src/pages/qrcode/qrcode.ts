import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

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
    public qrScanner: QRScanner
  ) {
    this.scannedText = '';
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    console.log('Camera View: shown');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    console.log('Camera View: hidden');
  }

  stopScan() {
    this.qrScanner.hide(); // hide camera preview
    this.scanSub.unsubscribe(); // stop scanning
  }

  doScan() {
    // Optionally request the permission early
    console.log('QR: Trying to scan...')
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        console.log('QR: Camera Permission Given');
 
        // start scanning
        this.scanSub = this.qrScanner.scan().subscribe((text: any) => {
          console.log('QR: Scanned something', text);
          this.scannedText = text.result;
          this.stopScan();
        });
 
        //this.qrScanner.show();
        console.log('QR: Scanner scanning');
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        console.log('QR: Camera permission denied FOREVER');
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        console.log('QR: Camera permission denied this time');
      }
    })
    .catch((e: any) => {
      console.log('QR: Error is', e)
    });
  }

  ionViewWillLeave() {
    this.hideCamera();
    this.stopScan();
  }

  ionViewDidEnter(){
    this.showCamera();
    this.doScan();
  }
}
