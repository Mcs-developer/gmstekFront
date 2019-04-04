import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Policy } from './policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  getPolicies() {
      return this.http.get<any>(`${environment.api}/policy`)
          .pipe(map(response => {
              return response;
          }));
  }

  getPolicy(id: number) {
    if (id === 0) {
      return of(this.initializePolicy());
    }
    const url = `${environment.api}/policy/${id}`;
    return this.http.get<Policy>(url);
  }

  createPolicy(policy: Policy): Observable<Policy> {
    const p = {
      name: policy.name,
      coveragePercent: policy.coveragePercent,
      startPolicy: policy.startPolicy,
      coveragePeriod: policy.coveragePeriod,
      costPolicy: policy.costPolicy,
      riskTypeId: policy.riskTypeId
    };
    return this.http.post<Policy>(`${environment.api}/policy`, p);
  }

  updatePolicy(policy: Policy): Observable<Policy> {
    const url = `${environment.api}/policy/${policy.id}`;
    return this.http.put<Policy>(url, policy)
      .pipe(
        map(() => policy)
      );
  }

  deletePolicy(id: number): Observable<{}> {
    const url = `${environment.api}/policy/${id}`;
    return this.http.delete<Policy>(url);
  }

  private initializePolicy(): Policy {
    // Return an initialized object
    return {
      id: 0,
      costPolicy: 0,
      coveragePercent: 0,
      coveragePeriod: 0,
      name: '',
      startPolicy: null,
      riskTypeId: null
    };
  }
}
