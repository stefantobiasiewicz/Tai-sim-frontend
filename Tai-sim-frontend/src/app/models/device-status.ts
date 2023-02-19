export interface DeviceStatus {
  deviceCode: string;
  deviceMqtt: DeviceMqtt;
  lightOnOff: boolean;
  doorsOpenClose: boolean;
  heaterOnOff: boolean;
  heaterSetTemp: number;
  fanOnOff: boolean;
  temperature: number;
  pressure: number;
  humidity: number;
  humidifierOnOff: boolean;
}

interface DeviceMqtt {
  id: number;
  toDeviceTopic: string;
  toServiceTopic: string;
}