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
}
