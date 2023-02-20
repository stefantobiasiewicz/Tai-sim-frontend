import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Device } from '../models/device';
import { DeviceStatus } from '../models/device-status';
import { BackendInterfaceService } from '../services/backend-interface.service';
import { DevicesListSelectionService } from '../services/devices-list-selection.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.less']
})
export class DeviceDetailsComponent implements OnInit {
  public deviceId?: number;
  public deviceStatus?: DeviceStatus;
  public device?: Device;

  constructor(private _route: ActivatedRoute, private _devicesListService: DevicesListSelectionService, private _api: BackendInterfaceService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.deviceId = params['device'];

      this.device = undefined;
      this.deviceStatus = undefined;

      this._devicesListService.setSelection(this.deviceId!);

      this._api.getDeviceStatus(this.deviceId!).subscribe({
        next: (status: DeviceStatus) => {
          this.deviceStatus = status;
          this.device = {
            id: this.deviceId!,
            code: status.deviceCode,
            authorized: true
          };
        }
      });
    });
  }
}
