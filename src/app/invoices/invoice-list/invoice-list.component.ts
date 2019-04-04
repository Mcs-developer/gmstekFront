import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.sass']
})
export class InvoiceListComponent implements OnInit {
  errorMessage: string;
  invoices: any[];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService
        .getInvoices()
        .subscribe(invoices => {
          this.invoices = invoices
        })

  }

}
