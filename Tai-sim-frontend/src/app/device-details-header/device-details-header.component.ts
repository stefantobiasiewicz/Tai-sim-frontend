import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'app-device-details-header',
  templateUrl: './device-details-header.component.html',
  styleUrls: ['./device-details-header.component.less']
})
export class DeviceDetailsHeaderComponent implements OnInit, OnChanges {
  @Input()
  public device?: Device;


  constructor(private _ref: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    this._ref.detectChanges();
  }

  ngOnInit() {
  }

}
