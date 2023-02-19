import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'app-device-button',
  templateUrl: './device-button.component.html',
  styleUrls: ['./device-button.component.less']
})
export class DeviceButtonComponent implements OnInit {

  @Input()
  public deviceData?: Device

  @Input()
  public index?: number;

  @Input()
  public devicesListLength?: number

  @Input()
  public isSelected: boolean = false;

  public isAuthorized?: boolean;

  constructor() { }

  ngOnInit() {
    this.isAuthorized = this.deviceData?.authorized;
  }

}
