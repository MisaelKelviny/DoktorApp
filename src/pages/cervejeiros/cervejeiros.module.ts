import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CervejeirosPage } from './cervejeiros';

@NgModule({
  declarations: [
    CervejeirosPage,
  ],
  imports: [
    IonicPageModule.forChild(CervejeirosPage),
  ],
})
export class CervejeirosPageModule {}
