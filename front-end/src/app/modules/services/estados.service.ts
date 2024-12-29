import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  constructor(private http: HttpClient) { }
  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${environment.apiUrl}/estados`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar os estados:', error);
          return [];
        })
      );
  }
  getEstadosById(estadoId): Observable<Estado> {
    return this.http.get<Estado>(`${environment.apiUrl}/estados/${estadoId}`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar os estado por id:', error);
          return [];
        })
      );
  }

  getSiglaUF(municipio: string): Observable<string> {
    return this.getEstados()
      .pipe(
        map(estados => {
          const estado = estados.find(e => e.nome.toLowerCase() === municipio.toLowerCase());
          return estado ? estado.sigla : null;
        })
      );
  }
  getEstadosByRegiao(regiaoId: number): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${environment.apiUrl}/regioes/${regiaoId}/estados`);
  }
}
