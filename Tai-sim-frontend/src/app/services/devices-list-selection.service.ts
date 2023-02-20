import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorizationModel } from '../models/authorization-model';

@Injectable({
  providedIn: 'root'
})
export class DevicesListSelectionService {
  public selectedDeviceId = new Subject<number>();
  public newAuthorization = new Subject<AuthorizationModel>();

constructor() { }

public setSelection(deviceId: number): void {
  this.selectedDeviceId.next(deviceId);
}

public setAuthorization(auth: AuthorizationModel) {
  this.newAuthorization.next(auth);
}

}
