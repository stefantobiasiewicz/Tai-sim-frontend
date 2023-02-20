import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationModel } from '../models/authorization-model';
import { Device } from '../models/device';
import { BackendInterfaceService } from '../services/backend-interface.service';
import { DevicesListSelectionService } from '../services/devices-list-selection.service';

@Component({
  selector: 'app-not-authorized-device-details',
  templateUrl: './not-authorized-device-details.component.html',
  styleUrls: ['./not-authorized-device-details.component.less']
})
export class NotAuthorizedDeviceDetailsComponent implements OnInit {
  public deviceId?: number;
  public device?: Device;
  public authorizeError: boolean = false;
  public authorizeErrorMsg: string = 'An unexpected error during the device authorization occured.';

  constructor(private _route: ActivatedRoute, private _api: BackendInterfaceService, private _deviceListService: DevicesListSelectionService, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if (this.authorizeError) {
        this.authorizeError = false;
      }
      this.deviceId = params['device'];

      if (this.deviceId) {
        this._api.getDeviceCode(this.deviceId).subscribe({
          next: (code) => {
            this.device = {
              authorized: false,
              code: code, 
              id: this.deviceId!
            };
          },
          error: (err) => {
            console.error(err);
          }
        });

        this._deviceListService.setSelection(this.deviceId!);
      }
    });
  }

  public authorize(): void {
    this._api.authorize(this.deviceId!).subscribe({
      next: (deviceStatus) => {
        let auth: AuthorizationModel = {
          deviceId: this.deviceId!,
          isAuthorized: true
        };
        this.authorizeError = false;
        this._deviceListService.setAuthorization(auth);
        this._router.navigate(["device-view", this.deviceId]);
      },
      error: (error) => {
        this.authorizeError = true;
      }
    });
  }

}
