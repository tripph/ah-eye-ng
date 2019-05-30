import { Injectable } from '@angular/core';
import {MockUserdataService} from './mock-userdata.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDashboardService {
  topSellers = [
    {name: 'Murbs', id: 1},
    {name: 'Moose', id: 3}
  ];
  constructor(private userDataService: MockUserdataService, private httpClient: HttpClient) { }
  getTopSellers(): Observable<any> {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.topSellers);
        observer.complete();
      }, 1500);
    });
  }
}
