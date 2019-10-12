import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditoPage } from './credito';

@NgModule({
  declarations: [
    CreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditoPage),
  ],
})
export class CreditoPageModule {}
