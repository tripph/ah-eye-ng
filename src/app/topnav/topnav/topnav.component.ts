import { Component, OnInit } from '@angular/core';
import {Regions} from '../../models/regions.enum';
import {REALMS} from '../../models/realms.enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  regions = Object.keys(Regions);
  realms = [];
  constructor(private fb: FormBuilder) { }
  form: FormGroup;
  ngOnInit() {
    this.form = this.fb.group({
      region: [],
      realm: []
    });
    this.regionControl.valueChanges.subscribe((region: string) => {
      this.realms = Object.keys(REALMS[region.toLowerCase()]);
      this.realmControl.setValue(null);
      console.log(this.realms);
    });
  }
  get regionControl() { return this.form.get('region'); }
  get realmControl() { return this.form.get('realm'); }

}
