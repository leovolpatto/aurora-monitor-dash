import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPage } from './status.page';
import { DeviceDetailsPage } from '../device-details/device-details.page';
import { DeviceDetailsPageModule } from '../device-details/device-details.module';
import { DeviceDetailsPageRoutingModule } from '../device-details/device-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StatusPage }])
  ],
  declarations: [StatusPage],
  entryComponents:[
        
  ]
})
export class StatusPageModule {}
