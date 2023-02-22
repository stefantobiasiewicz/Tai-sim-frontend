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

// "lightOnOff":false,           //togle
// "doorsOpenClose":false,        //togle
// "heaterOnOff":false,            //togle
// "heaterSetTemp":22.200000762939453,    //input
// "fanOnOff":false,                //togle
// "temperature":23.3,                  //input
// "pressure":980.0,                    //input
// "humidity":50.0,                      //input
// "humidifierOnOff":false}              //togle