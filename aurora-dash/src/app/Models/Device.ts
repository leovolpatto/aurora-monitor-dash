import { Message } from './Message';
import { DeviceCount, DevicePinCount } from './DeviceCount';

export class Device{

    public deviceId: String;
    public name: String;

    public devicePins: Array<DevicePinCount>;
    public count: Number = 0;

    constructor(){
        this.devicePins = [];
    }

}