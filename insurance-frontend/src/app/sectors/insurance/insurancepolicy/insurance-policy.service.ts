import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { InsurancePolicy } from './insurance-policy.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  private apiUrl = environment.apiBaseURI + '/InsurancePolicy';

  constructor(private http: HttpClient) {}

  getInsurancePolicy(id: number): Observable<InsurancePolicy> {
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/${id}`);
  }

  getInsurancePoliciesList(): Observable<InsurancePolicy[]> {
    return this.http.get<InsurancePolicy[]>(this.apiUrl);
  }

  postInsurancePolicy(insurancePolicy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.post<InsurancePolicy>(this.apiUrl, insurancePolicy);
  }

  putInsurancePolicy(insurancePolicy: InsurancePolicy): Observable<any> {
    return this.http.put(`${this.apiUrl}/${insurancePolicy.insurancePolicyID}`, insurancePolicy);
  }

  deleteInsurancePolicy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
