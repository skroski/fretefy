import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipios';
import { RegiaoBrasil } from '../models/regiaobrasil';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(private httpClient: HttpClient) { }

  getRegioesBrasil(): Observable<RegiaoBrasil[]> {
    return this.httpClient.get<RegiaoBrasil[]>(`${environment.apiUrl}/regioes`);
  }

  getMunicipiosByEstado(estadoId: number): Observable<Municipio[]> {
    return this.httpClient.get<Municipio[]>(`${environment.apiUrl}/estados/${estadoId}/municipios`);
  }

}
