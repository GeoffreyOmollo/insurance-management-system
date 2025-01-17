import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Exclusion } from './exclusion.model';

@Injectable({
  providedIn: 'root'
})
export class ExclusionService {
  private apiUrl = environment.apiBaseURI + '/Exclusions';

  constructor(private http: HttpClient) { }

  getExclusion(id: number): Observable<Exclusion> {
    return this.http.get<Exclusion>(`${this.apiUrl}/${id}`);
  }

  getExclusionsList(): Observable<Exclusion[]> {
    return this.http.get<Exclusion[]>(this.apiUrl);
  }

  postExclusion(exclusion: Exclusion): Observable<Exclusion> {
    return this.http.post<Exclusion>(this.apiUrl, exclusion);
  }

  putExclusion(exclusion: Exclusion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${exclusion.exclusionID}`, exclusion);
  }

  deleteExclusion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
