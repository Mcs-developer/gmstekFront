import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Item } from '../models/item';
import { from } from 'rxjs';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.sass']
})
export class InvoiceNewComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  items: Item[];
  errorMessage: string;

  
  constructor(private _formBuilder: FormBuilder,
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      items: this._formBuilder.array([])
    });
    this.secondFormGroup = this._formBuilder.group({
      clientName: ''
    });

    this.itemService
      .getItems()
      .pipe(
        switchMap(items => {
          return from(items);
        }),
        map(item => {
          return new Item(item)
        }),
        toArray()
      )
      .subscribe(items => {
        this.items = items;
      })
  }

  addItems(item: Item) {
    const items = this.firstFormGroup.controls.items as FormArray;
    items.push(this._formBuilder.group({
      name: item.name,
      code: item.code,
      quantity: ['', Validators.required],
      unitValue: ['', Validators.required],
    }));
    item.isAdded = !item.isAdded;
  }

  remoteItems(index) {
    const items = this.firstFormGroup.controls.items as FormArray;
    const x = items.at(index);
    const it = this.items.find(q => q.code == x.get('code').value);
    it.isAdded = !it.isAdded;
    items.removeAt(index);

  }
  saveInvoice() {
    const items = this.firstFormGroup.controls.items as FormArray;
    const request = {
      clientName: this.secondFormGroup.get('clientName').value,
      items: items.getRawValue()
    }
    this.invoiceService
        .saveInvoice(request)
        .subscribe(
          () =>  this.onSaveComplete('Invoice Saved!'))
  }
  onSaveComplete(message?: string): void {
    if (message) {
      alert(message);
    }

    // Navigate back to the invoices list
    this.router.navigate(['/invoices']);
  }
}
