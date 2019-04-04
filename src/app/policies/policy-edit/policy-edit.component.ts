import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from '../policy';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.sass'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class PolicyEditComponent implements OnInit {
  pageTitle: string;
  errorMessage: string;
  policy: Policy;
  policyForm: FormGroup;
  riskTypes: any[] =
  [
    { id: 1, name: 'low', scale: 0},
    { id: 2, name: 'medium', scale: 1},
    { id: 3, name: 'medium-high', scale: 2},
    { id: 4, name: 'high', scale: 3}
  ];

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.policyForm = this.createFormGroup();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.getPolicy(+params.get('id'));
    });
  }

  getPolicy(id: number): void {
    this.policyService
      .getPolicy(id)
      .subscribe(
        (policy: Policy) => this.onProductRetrieved(policy),
        (error: any) => (this.errorMessage = <any>error)
      );
  }

  onProductRetrieved(policy: Policy): void {
    this.policy = policy;
    this.policyForm.setValue({
      id: this.policy.id,
      name: this.policy.name,
      costPolicy: this.policy.costPolicy,
      coveragePercent: this.policy.coveragePercent,
      coveragePeriod: this.policy.coveragePeriod,
      startPolicy: this.policy.startPolicy ? new Date(this.policy.startPolicy) : null,
      riskTypeId: this.policy.riskTypeId,
    });
    if (this.policy.id === 0) {
      this.pageTitle = 'Add Policy';
    } else {
      this.pageTitle = `Edit Policy: ${this.policy.name}`;
    }
  }

  savePolicy(): void {
      const policy: Policy = Object.assign({}, this.policyForm.value);
      if (this.policy.id === 0) {
        this.policyService.createPolicy(policy)
          .subscribe(
            () =>  this.onSaveComplete(`The new ${this.policy.name} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.policyService.updatePolicy(policy)
          .subscribe(
            () => this.onSaveComplete(`The updated ${this.policy.name} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      }
  }

  deletePolicy(): void {
    if (this.policy.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.policy.name} was deleted`);
    } else {
      if (confirm(`Really delete the policy: ${this.policy.name}?`)) {
        this.policyService.deletePolicy(this.policy.id)
          .subscribe(
            () => this.onSaveComplete(`${this.policy.name} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      costPolicy: new FormControl(null, Validators.required),
      coveragePercent: new FormControl(null, Validators.required),
      coveragePeriod: new FormControl(null, Validators.required),
      startPolicy: new FormControl(null, Validators.required),
      riskTypeId: new FormControl(null, Validators.required),
    });
  }

  onSaveComplete(message?: string): void {
    if (message) {
      alert(message);
    }

    // Navigate back to the product list
    this.router.navigate(['/policies']);
  }
}
