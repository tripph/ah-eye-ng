import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  realms = new BehaviorSubject<Realm[]>([]);

  constructor(private http: HttpClient) {
  }

  getRealms() {
    this.http.get<Realm[]>(environment.apiUrl + 'realm-list').subscribe(r => this.realms.next(r));
  }
}

export class Realm {
  name: string;
  id: number;
  slug: string;
}
