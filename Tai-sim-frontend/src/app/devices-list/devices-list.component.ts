import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { AuthorizationModel } from '../models/authorization-model';
import { Device } from '../models/device';
import { DevicesListSelectionService } from '../services/devices-list-selection.service';

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

  constructor(private _devicesListService: DevicesListSelectionService) { }

  ngOnInit() {
    this._devicesListService.selectedDeviceId.subscribe({
      next: deviceId => {
        this.selectedDeviceIndex = deviceId;
      }
    });

    this._devicesListService.newAuthorization.subscribe({
      next: (auth: AuthorizationModel) => {
        debugger;
        let idx = this.devicesList?.findIndex(d => d.id == auth.deviceId);
        if (this.devicesList && idx) {
          this.devicesList![idx!].authorized = auth.isAuthorized;
        }
      }
    });
  }

  public deviceChosen(deviceIndex: number) {
    this.selectedDeviceIndex = deviceIndex;
    if (this.devicesList) {
      this.deviceSelected.emit(this.devicesList![deviceIndex]);
    }
  }
}
