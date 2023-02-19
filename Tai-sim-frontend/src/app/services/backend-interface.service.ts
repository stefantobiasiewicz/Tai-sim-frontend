import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Device } from '../models/device';
import { DeviceStatus } from '../models/device-status';

@Injectable({
  providedIn: 'root'
})
export class BackendInterfaceService {
  private _url: string = environment.backendUlr;

  constructor(private _http: HttpClient) { }

  public getDevices(): Observable<Device[]> {
    return this._http.get<Device[]>(this._url + '/device/get/all');
  }

  public getDeviceStatus(): Observable<DeviceStatus> {
    return this._http.get<DeviceStatus>(this._url + 'device/get/status');
  }

}
