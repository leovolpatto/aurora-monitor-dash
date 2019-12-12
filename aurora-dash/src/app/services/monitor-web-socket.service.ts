import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/Models/Message';
import { Device } from 'src/app/Models/Device';
import { DeviceCount, DevicePinCount } from 'src/app/Models/DeviceCount';

@Injectable({
  providedIn: 'root'
})
export class MonitorWebSocketService {

  private static socket : any;
  public static events$ : Observable<any>;

  public static devices: Array<Device> = [];

  constructor() {
  }

  public getSocket() : Observable<any>{
    return MonitorWebSocketService.events$;
  }

  public initSocket() {
    if(MonitorWebSocketService.socket != null){
      return;
    }

    MonitorWebSocketService.events$ = new Observable(observer => {
      MonitorWebSocketService.socket = (window as any).io("//:81", { forceNew: true });
      //MonitorWebSocketService.socket = (window as any).io("//:3000", { forceNew: true });
      MonitorWebSocketService.socket.on('newDevice', function(msg){
        let newDev = new Device();
        newDev.deviceId = msg.deviceId;
        newDev.name = msg.name;
        observer.next(newDev);

        MonitorWebSocketService.devices.push(newDev);
      });

      MonitorWebSocketService.socket.on('evt', function(msg){
        console.log(msg);

        if(msg.actionPin == null){
          return;
        }

        let count = new DeviceCount();
        count.deviceId = msg.deviceId;
        count.actionPin = new DevicePinCount();
        count.actionPin.count = msg.actionPin.count;
        count.actionPin.id = msg.actionPin.id;
        count.actionPin.status = msg.actionPin.status;
        
        observer.next(count);
      });
    });
  }
}
