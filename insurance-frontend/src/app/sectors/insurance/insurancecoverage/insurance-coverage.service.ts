import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { InsuranceCoverage } from './insurance-coverage.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCoverageService {
  private apiUrl = environment.apiBaseURI + '/InsuranceCoverage';

  constructor(private http: HttpClient) {}

  getInsuranceCoverage(id: number): Observable<InsuranceCoverage> {
    return this.http.get<InsuranceCoverage>(`${this.apiUrl}/${id}`);
  }

  getInsuranceCoverageList(): Observable<InsuranceCoverage[]> {
    return this.http.get<InsuranceCoverage[]>(this.apiUrl);
  }

  postInsuranceCoverage(coverage: InsuranceCoverage): Observable<InsuranceCoverage> {
    return this.http.post<InsuranceCoverage>(this.apiUrl, coverage);
  }

  putInsuranceCoverage(coverage: InsuranceCoverage): Observable<any> {
    return this.http.put(`${this.apiUrl}/${coverage.insuranceCoverageID}`, coverage);
  }

  deleteInsuranceCoverage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
