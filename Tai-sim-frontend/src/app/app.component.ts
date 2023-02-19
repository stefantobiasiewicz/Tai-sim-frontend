import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from './models/device';
import { BackendInterfaceService } from './services/backend-interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public devices?: Device[];

  constructor(private _api: BackendInterfaceService, private _router: Router) { }

  public ngOnInit(): void {
    this._api.getDevices().subscribe({
      next: (devices: Device[]) => {
        this.devices = devices;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public deviceSelected(device: Device) {
    this._router.navigate(["device-view", device.id]);
  }


}
