import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent implements OnInit {
  @Input()
  public devicesList?: Device[];
  public selectedDeviceIndex?: number;

  @Output()
  public deviceSelected = new EventEmitter<Device>();

  constructor() { }

  ngOnInit() {
  }

  public deviceChosen(deviceIndex: number) {
    this.selectedDeviceIndex = deviceIndex;
    if (this.devicesList) {
      this.deviceSelected.emit(this.devicesList![deviceIndex]);
    }
  }
}
