import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getDeviceStatus(deviceId: number): Observable<DeviceStatus> {
    return this._http.get<DeviceStatus>(this._url + '/device/get/status/' + deviceId);
  }

  public getDeviceCode(deviceId: number): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._http.get(this._url + '/device/get/code/' + deviceId, { responseType: 'text' });
  }

  public authorize(deviceId: number): Observable<DeviceStatus> {
    return this._http.post<DeviceStatus>(this._url + '/device/authorize/' + deviceId, undefined);
  }

}
