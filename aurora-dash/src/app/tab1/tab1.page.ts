import { Component } from '@angular/core';
import { MonitorWebSocketService } from '../services/monitor-web-socket.service';
import { Device } from '../Models/Device';
import { Message } from '../Models/Message';
import { DeviceCount } from '../Models/DeviceCount';
import { ModalController } from '@ionic/angular';
import { DeviceDetailsPage } from '../device-details/device-details.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public devices: Array<Device> = [];

  constructor(private ws: MonitorWebSocketService, private modalCtrl: ModalController) {

    this.ws.getSocket().subscribe((obs) => {
      if(obs instanceof Device){
        const x = this.devices.find((dc) => {
          return dc.deviceId == obs.deviceId;
        });
        if(x == null){
          this.devices.push(obs);
        }
      }
      else{
        const x = this.devices.find((dc) => {
          return dc.deviceId == obs.deviceId;
        });
        
        if(x != null){
          x.deviceCounts.push(obs);
          x.count = x.deviceCounts.length;
        }
      }
    });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: DeviceDetailsPage
    });

    return await modal.present();
  }  

  public showDetail(device: Device){
    console.log(device);
    this.presentModal();    
  }
}
