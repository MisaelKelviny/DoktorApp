import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CervejeirosPage } from './cervejeiros';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    CervejeirosPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(CervejeirosPage),
  ],
})
export class CervejeirosPageModule {}
