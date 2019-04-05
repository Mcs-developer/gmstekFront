import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getInvoices() {
    return this.http.get<any>(`${environment.api}/invoice`)
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  getInvoice(id) {
    return this.http.get<any>(`${environment.api}/invoice/${id}`)
  }

  saveInvoice(request) {
    return this.http.post(`${environment.api}/invoice`, request);
  }

  updateInvoice(id, items){
    return this.http.put(`${environment.api}/invoice/${id}`, items);
  }

  deleteInvoice(id) {
    return this.http.delete(`${environment.api}/invoice/${id}`);
  }
}
