import { Component } from '@angular/core';
import { MonitorWebSocketService } from '../services/monitor-web-socket.service';
import { Device } from '../Models/Device';
import { Message } from '../Models/Message';
import { DeviceCount, DevicePinCount } from '../Models/DeviceCount';
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

        this.devices.sort((a:Device, b:Device) => {
          if(a.count == b.count){
            return 0;
          }

          return a.count > b.count ? -1 : 1;
        });
      }
      else{
        const deviceCount = (obs as DeviceCount);

        const device = this.devices.find((dc) => {
          return dc.deviceId == deviceCount.deviceId;
        });
        
        if(device != null){
          if(device.devicePins == null){
            device.devicePins = [];
          }
          let pin = device.devicePins.find(dp => dp.id == deviceCount.actionPin.id);
          if(pin == null){
            pin = deviceCount.actionPin;
            device.devicePins.push(pin);
          }
          else{
            pin.count = deviceCount.actionPin.count;
            pin.status = deviceCount.actionPin.status;
          }
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
