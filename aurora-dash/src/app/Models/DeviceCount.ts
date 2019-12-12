export class DeviceCount{
    public deviceId: String
    public count: Number;

    public actionPin: DevicePinCount;
}

export class DevicePinCount{
    public id: Number;
    public count: Number;
    public status: Number;
}