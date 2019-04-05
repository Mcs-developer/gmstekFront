import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.sass']
})
export class InvoiceViewComponent implements OnInit {

  invoice;
  subtotal;
  iva;
  total;

  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getInvoice(+params.get('id'));
   });

  }

  getInvoice(id) {
    this.invoiceService
        .getInvoice(id) 
        .subscribe(invoice => {
          this.onInvoiceRetrieved(invoice);
        })
  }

  onInvoiceRetrieved(invoice): void {
    this.invoice = invoice;
    this.subtotal = this.invoice
                        .invoiceItems
                        .map(item => (item.quantity * item.unitValue))
                        .reduce((a,b) => a + b);
    this.iva = this.subtotal * 0.16;

    this.total = this.subtotal + this.iva;
  
  }

}
