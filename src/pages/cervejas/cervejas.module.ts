import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CervejasPage } from './cervejas';

@NgModule({
  declarations: [
    CervejasPage,
  ],
  imports: [
    IonicPageModule.forChild(CervejasPage),
  ],
})
export class CervejasPageModule {}
