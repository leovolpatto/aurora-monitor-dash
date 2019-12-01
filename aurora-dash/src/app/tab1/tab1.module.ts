import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { DeviceDetailsPage } from '../device-details/device-details.page';
import { DeviceDetailsPageModule } from '../device-details/device-details.module';
import { DeviceDetailsPageRoutingModule } from '../device-details/device-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page],
  entryComponents:[
        
  ]
})
export class Tab1PageModule {}
