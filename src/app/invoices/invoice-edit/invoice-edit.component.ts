import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.sass']
})
export class InvoiceEditComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      items: this._formBuilder.array([])
    });
    
  }

  addItems() {
    const items = this.firstFormGroup.controls.credentials as FormArray;
    items.push(this._formBuilder.group({
      code: '',
      quantity: '',
      unitValue: '',
    }));
  }

}
