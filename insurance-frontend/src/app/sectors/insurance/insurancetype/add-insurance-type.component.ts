import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InsuranceTypeService } from './insurance-type.service';
import { Exclusion } from '../exclusion/exclusion.model';
import { ExclusionService } from '../exclusion/exclusion.service';
import { InsuranceCoverage } from '../insurancecoverage/insurance-coverage.model';
import { InsuranceCoverageService } from '../insurancecoverage/insurance-coverage.service';

@Component({
  selector: 'app-add-insurance-type',
  templateUrl: './add-insurance-type.component.html',
  styleUrls: ['./add-insurance-type.component.scss']
})
export class AddInsuranceTypeComponent {
  insuranceTypeForm: FormGroup;
  insuranceCoverages: InsuranceCoverage[] = [];
  exclusions: Exclusion[] = [];

  constructor(
    private fb: FormBuilder,
    private insuranceTypeService: InsuranceTypeService,
    private insuranceCoverageService: InsuranceCoverageService,
    private exclusionService: ExclusionService,
    private router: Router
  ) {
    // Initialize the form group
    this.insuranceTypeForm = this.fb.group({
      insuranceDescription: ['', Validators.required],
      deductible: [0, [Validators.required, Validators.min(0)]],
      policyLimitAmount: [0, [Validators.required, Validators.min(0)]],
      insuranceCoverageID: [null, Validators.required],
      exclusionID: [null, Validators.required],
    });

    // Fetch insurance coverages
    this.insuranceCoverageService.getInsuranceCoverageList().subscribe(
      (res: InsuranceCoverage[]) => this.insuranceCoverages = res,
      (error) => console.error('Error fetching insurance coverages:', error)
    );

    // Fetch exclusions
    this.exclusionService.getExclusionsList().subscribe(
      (res: Exclusion[]) => this.exclusions = res,
      (error) => console.error('Error fetching exclusions:', error)
    );
  }

  onSubmit() {
    if (this.insuranceTypeForm.valid) {
      this.insuranceTypeService.postInsuranceType(this.insuranceTypeForm.value).subscribe(
        () => this.router.navigate(['/insurancetype']),
        (error) => console.error('Error adding insurance type:', error)
      );
    }
  }

  // Cancel and navigate back to the insurance types list
  onCancel() {
    this.router.navigate(['/insurancetype']);
  }

}
