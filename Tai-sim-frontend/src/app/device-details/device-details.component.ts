import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Device } from '../models/device';
import { DeviceStatus } from '../models/device-status';
import { BackendInterfaceService } from '../services/backend-interface.service';
import { DevicesListSelectionService } from '../services/devices-list-selection.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.less']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {
  public deviceId?: number;
  public deviceStatus?: DeviceStatus;
  public device?: Device;
  public form?: FormGroup = this._formBuilder.group({
    heaterSetTemp: ['', []],
    temperature: ['', []],
    pressure: ['', []],
    humidity: ['', []],
  });
  public formToggles?: FormGroup = this._formBuilder.group({
    lightOnOff: ['', []],
    doorsOpenClose: ['', []],
    heaterOnOff: ['', []],
    fanOnOff: ['', []],
    humidifierOnOff: ['', []],
  });

  public lightOnOff?: boolean = false;
  public doorsOpenClose?: boolean = false;
  public heaterOnOff?: boolean = false;
  public fanOnOff?: boolean = false;
  public humidifierOnOff?: boolean = false;

  public subscription?: Subscription;

  constructor(private _route: ActivatedRoute, private _devicesListService: DevicesListSelectionService, private _api: BackendInterfaceService, private _formBuilder: FormBuilder, private ref: ChangeDetectorRef) { }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.deviceId = params['device'];

      this._devicesListService.setSelection(this.deviceId!);

      this._api.getDeviceStatus(this.deviceId!).subscribe({
        next: (status: DeviceStatus) => {
          this.deviceStatus = status;
          this.device = {
            id: this.deviceId!,
            code: status.deviceCode,
            authorized: true
          };
          this.lightOnOff = status.lightOnOff;
          this.doorsOpenClose = status.doorsOpenClose;
          this.heaterOnOff = status.heaterOnOff;
          this.fanOnOff = status.fanOnOff;
          this.humidifierOnOff = status.humidifierOnOff;
          this.ref.detectChanges();
        }
      });

    });
    this.ref.detectChanges();

    // const source = interval(3000);
    // this.subscription = source.subscribe(val => this.refresh());
  }

  public setParameters(): void {
    const newStatus: DeviceStatus = {
      deviceCode: this.deviceStatus!.deviceCode,
      deviceMqtt: this.deviceStatus!.deviceMqtt,
      lightOnOff: this.formToggles?.get('lightOnOff')?.value !== "" ? this.formToggles?.get('lightOnOff')?.value : this.deviceStatus?.lightOnOff,
      doorsOpenClose: this.formToggles?.get('doorsOpenClose')?.value !== "" ? this.formToggles?.get('doorsOpenClose')?.value : this.deviceStatus?.doorsOpenClose,
      heaterOnOff: this.formToggles?.get('heaterOnOff')?.value !== "" ? this.formToggles?.get('heaterOnOff')?.value : this.deviceStatus?.heaterOnOff,
      heaterSetTemp: this.form?.get('heaterSetTemp')?.value != "" ? this.form?.get('heaterSetTemp')?.value : this.deviceStatus?.heaterSetTemp,
      fanOnOff: this.formToggles?.get('fanOnOff')?.value !== "" ? this.formToggles?.get('fanOnOff')?.value : this.deviceStatus?.fanOnOff,
      temperature: this.form?.get('temperature')?.value != "" ? this.form?.get('temperature')?.value : this.deviceStatus?.temperature,
      pressure: this.form?.get('pressure')?.value != "" ? this.form?.get('pressure')?.value : this.deviceStatus?.pressure,
      humidity: this.form?.get('humidity')?.value != "" ? this.form?.get('humidity')?.value : this.deviceStatus?.humidity,
      humidifierOnOff: this.formToggles?.get('humidifierOnOff')?.value !== "" ? this.formToggles?.get('humidifierOnOff')?.value : this.deviceStatus?.humidifierOnOff
    };

    this._api.setDeviceStatus(newStatus, this.deviceId!).subscribe({
      next: (status: DeviceStatus) => {
        this.deviceStatus = status;

        this.lightOnOff = status.lightOnOff;
        this.doorsOpenClose = status.doorsOpenClose;
        this.heaterOnOff = status.heaterOnOff;
        this.fanOnOff = status.fanOnOff;
        this.humidifierOnOff = status.humidifierOnOff;

        this.ref.detectChanges();
      }
    })
  }

  public refresh(): void {
    this.ngOnInit();
    this.ref.detectChanges();
  }

}
