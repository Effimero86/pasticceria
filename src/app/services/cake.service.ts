import { Cake } from './../model/cake';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  private cakeEndpoint: string = 'api/cake';

  constructor(private http: HttpClient) { }

  getCake(id : string): Observable<Cake> {
    return this.http.get<Cake>(`${environment.endpoint}/${this.cakeEndpoint}/${id}`);
  }

  getCakes(): Observable<Cake[]> {
    return this.http.get<Cake[]>(`${environment.endpoint}/${this.cakeEndpoint}`);
  }

  addCake(cake: Cake): Observable<Cake> {
    return this.http.post<Cake>(`${environment.endpoint}/${this.cakeEndpoint}`, cake);
  }

  updateCake(id: string, cake: Cake): Observable<Cake> {
    return this.http.put<Cake>(`${environment.endpoint}/${this.cakeEndpoint}/${id}`, cake);
  }

  deleteCake(id: string): Observable<Cake> {
    return this.http.delete<Cake>(`${environment.endpoint}/${this.cakeEndpoint}/${id}`);
  }
}
