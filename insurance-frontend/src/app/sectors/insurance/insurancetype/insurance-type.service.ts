import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { InsuranceType } from './insurance-type.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceTypeService {
  private apiUrl = environment.apiBaseURI + '/InsuranceType';

  constructor(private http: HttpClient) {}

  getInsuranceType(id: number): Observable<InsuranceType> {
    return this.http.get<InsuranceType>(`${this.apiUrl}/${id}`);
  }

  getInsuranceTypesList(): Observable<InsuranceType[]> {
    return this.http.get<InsuranceType[]>(this.apiUrl);
  }

  postInsuranceType(insuranceType: InsuranceType): Observable<InsuranceType> {
    return this.http.post<InsuranceType>(this.apiUrl, insuranceType);
  }

  putInsuranceType(insuranceType: InsuranceType): Observable<any> {
    return this.http.put(`${this.apiUrl}/${insuranceType.insuranceTypeID}`, insuranceType);
  }

  deleteInsuranceType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
