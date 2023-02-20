import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { NotAuthorizedDeviceDetailsComponent } from './not-authorized-device-details/not-authorized-device-details.component';

const routes: Routes = [
  {path: 'device-view/:device', component: DeviceDetailsComponent },
  { path: 'no-auth-device-view/:device', component: NotAuthorizedDeviceDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
