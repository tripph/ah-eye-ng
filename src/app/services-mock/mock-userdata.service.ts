import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockUserdataService {
  region: string = null;
  realm: string = null;
  constructor() { }
}
