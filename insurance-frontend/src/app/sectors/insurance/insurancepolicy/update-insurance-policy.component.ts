import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InsurancePolicy } from './insurance-policy.model';
import { InsurancePolicyService } from './insurance-policy.service';
import { InsuranceType } from '../insurancetype/insurance-type.model';
import { InsuranceTypeService } from '../insurancetype/insurance-type.service';

@Component({
  selector: 'app-update-insurance-policy',
  templateUrl: './update-insurance-policy.component.html',
  styleUrls: ['./update-insurance-policy.component.scss']
})
export class UpdateInsurancePolicyComponent implements OnInit {
  insurancePolicyForm: FormGroup;
  insurancePolicyID: number;
  insuranceTypes: InsuranceType[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private insurancePolicyService: InsurancePolicyService,
    private insuranceTypeService: InsuranceTypeService
  ) {}

  ngOnInit(): void {
    // Get the insurancePolicyID from the route
    this.insurancePolicyID = +this.route.snapshot.paramMap.get('id');

    // Fetch insurance types for the dropdown
    this.insuranceTypeService.getInsuranceTypesList().subscribe(
      (res: InsuranceType[]) => (this.insuranceTypes = res),
      (error) => console.error('Error fetching insurance types:', error)
    );

    // Initialize the form
    this.insurancePolicyForm = this.fb.group({
      policyHolder: ['', Validators.required],
      insuranceTypeID: [null, Validators.required],
      premiumAmount: [0, [Validators.required, Validators.min(0)]],
    });

    // Fetch the insurance policy data to pre-fill the form
    this.insurancePolicyService
      .getInsurancePolicy(this.insurancePolicyID)
      .subscribe((policy: InsurancePolicy) => {
        this.insurancePolicyForm.patchValue(policy);
        // Ensure the form control for insuranceTypeID is set with the type ID
        this.insurancePolicyForm
          .get('insuranceTypeID')
          ?.setValue(policy.insuranceTypeID);
      });
  }

  // Submit updated form
  onSubmit(): void {
    if (this.insurancePolicyForm.valid) {
      const updatedPolicy: InsurancePolicy = {
        ...this.insurancePolicyForm.value,
        insurancePolicyID: this.insurancePolicyID,
      };
      this.insurancePolicyService
        .putInsurancePolicy(updatedPolicy)
        .subscribe(() => {
          this.router.navigate(['/insurancepolicy']); // Redirect back to the policies list
        });
    }
  }

  // Cancel the update and redirect to the insurance policies list
  onCancel(): void {
    this.router.navigate(['/insurancepolicy']);
  }

}
