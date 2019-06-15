import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfigService, Realm} from '../../services-real/config.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  realms: Realm[] = [];
  realmIsValid = false;
  filteredRealms: Observable<Realm[]>;

  constructor(private fb: FormBuilder, private configService: ConfigService) {
  }
  form: FormGroup;
  ngOnInit() {
    this.configService.realms.subscribe(realms => {
      if (realms !== this.realms) {
        this.realms = realms;
      }
    });
    this.form = this.fb.group({
      realm: ['']
    });
    this.filteredRealms = this.realmControl.valueChanges.pipe(
      map(realm => this.realms.filter(r => r.name.toLowerCase().includes(realm.toLowerCase()))),
    );
    this.realmControl.valueChanges.subscribe(realm => {
      this.realmIsValid = this.realms.map(r => r.name).includes(realm);
    });
  }
  get realmControl() { return this.form.get('realm'); }

}
