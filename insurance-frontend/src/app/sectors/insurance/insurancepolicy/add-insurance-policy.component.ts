import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InsurancePolicyService } from './insurance-policy.service';
import { InsuranceType } from '../insurancetype/insurance-type.model';
import { InsuranceTypeService } from '../insurancetype/insurance-type.service';

@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrls: ['./add-insurance-policy.component.scss']
})
export class AddInsurancePolicyComponent {
  insurancePolicyForm: FormGroup;
  insuranceTypes: InsuranceType[] = [];

  constructor(
    private fb: FormBuilder,
    private insurancePolicyService: InsurancePolicyService,
    private insuranceTypeService: InsuranceTypeService,
    private router: Router
  ) {
    this.insurancePolicyForm = this.fb.group({
      policyHolder: ['', Validators.required],
      insuranceTypeID: [null, Validators.required],
      premiumAmount: [0, [Validators.required, Validators.min(0)]],
    });

    // Fetch the list of insurance types
    this.insuranceTypeService.getInsuranceTypesList().subscribe(
      (res: InsuranceType[]) => this.insuranceTypes = res,
      (error) => console.error('Error fetching insurance types:', error)
    );
  }

  onSubmit() {
    if (this.insurancePolicyForm.valid) {
      this.insurancePolicyService.postInsurancePolicy(this.insurancePolicyForm.value).subscribe(
        () => this.router.navigate(['/insurancepolicy']),
        (error) => console.error('Error adding insurance policy:', error)
      );
    }
  }

  // Cancel and navigate back to the insurance policies list
  onCancel() {
    this.router.navigate(['/insurancepolicy']);
  }

}
