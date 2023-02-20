import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'app-device-details-header',
  templateUrl: './device-details-header.component.html',
  styleUrls: ['./device-details-header.component.less']
})
export class DeviceDetailsHeaderComponent implements OnInit {
  @Input()
  public device?: Device;

  constructor() { }

  ngOnInit() {
  }

}
