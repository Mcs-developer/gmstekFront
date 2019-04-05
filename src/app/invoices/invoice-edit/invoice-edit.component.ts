import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.sass']
})
export class InvoiceEditComponent implements OnInit {

  formEdit: FormGroup;
  invoice;
  errorMessage: string;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private invoiceService: InvoiceService,
              private router: Router) {}

  ngOnInit() {
    this.formEdit = this._formBuilder.group({
      items: this._formBuilder.array([])
    });

    this.route.paramMap.subscribe(params => {
      this.getInvoice(+params.get('id'));
   });
    
  }

  getInvoice(id) {
    this.invoiceService
        .getInvoice(id)
        .subscribe(invoice => {
          this.onInvoiceRetrieved(invoice);
        });
  }
  

  onInvoiceRetrieved(invoice): void {
    this.invoice = invoice;
    const items = this.formEdit.controls.items as FormArray;
    invoice.invoiceItems.forEach(element => {
      items.push(this._formBuilder.group({
        name: element.item.name,
        code: element.item.code,
        quantity: [element.quantity, Validators.required],
        unitValue: [element.unitValue, Validators.required]
      }))
    });
  }

  updateInvoice() {
    const items = this.formEdit.controls.items as FormArray;
    this.invoiceService
        .updateInvoice(this.invoice.invoiceId, items.getRawValue())
        .subscribe(
          () => this.onSaveComplete('Invoice Updated!')
        );
  }

  deleteInvoice(): void {
      if (confirm(`Really do you want to delete the invoice: ${this.invoice.invoiceId}?`)) {
        this.invoiceService.deleteInvoice(this.invoice.invoiceId)
          .subscribe(
            () => this.onSaveComplete(`Invoice ${this.invoice.invoiceId} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
  }
  
  onSaveComplete(message?: string): void {
    if (message) {
      alert(message);
    }

    // Navigate back to the invoices list
    this.router.navigate(['/invoices']);
  }
}
