import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.sass']
})
export class PolicyListComponent implements OnInit {
  errorMessage: string;
  policies: Policy[];

  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.policyService.getPolicies()
                      .subscribe(policies =>  {
                        const result: Policy[] = Object.assign([], policies);
                        this.policies = result;
                      });
  }

}
