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

// {"deviceCode":"H0IDPW16II",

// "deviceMqtt":{"id":1,
//     "toDeviceTopic":"/tai/device/H0IDPW16II",
//     "toServiceTopic":"/tai/service/H0IDPW16II"},

// "lightOnOff":false,
// "doorsOpenClose":false,
// "heaterOnOff":false,
// "heaterSetTemp":22.200000762939453,
// "fanOnOff":false,
// "temperature":23.3,
// "pressure":980.0,
// "humidity":50.0,
// "humidifierOnOff":false}