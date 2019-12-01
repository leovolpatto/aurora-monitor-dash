import { Message } from './Message';
import { DeviceCount } from './DeviceCount';

export class Device{

    public deviceId: String;
    public name: String;

    public deviceCounts: Array<DeviceCount>;
    public count: Number = 0;

    constructor(){
        this.deviceCounts = [];
    }

}