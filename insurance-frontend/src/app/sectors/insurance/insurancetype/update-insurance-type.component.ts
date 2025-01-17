import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InsuranceType } from './insurance-type.model';
import { InsuranceTypeService } from './insurance-type.service';
import { Exclusion } from '../exclusion/exclusion.model';
import { ExclusionService } from '../exclusion/exclusion.service';
import { InsuranceCoverage } from '../insurancecoverage/insurance-coverage.model';
import { InsuranceCoverageService } from '../insurancecoverage/insurance-coverage.service';

@Component({
  selector: 'app-update-insurance-type',
  templateUrl: './update-insurance-type.component.html',
  styleUrls: ['./update-insurance-type.component.scss']
})
export class UpdateInsuranceTypeComponent implements OnInit {
  insuranceTypeForm: FormGroup;
  insuranceTypeID: number;
  exclusions: Exclusion[] = [];
  insuranceCoverages: InsuranceCoverage[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private insuranceTypeService: InsuranceTypeService,
    private exclusionService: ExclusionService,
    private insuranceCoverageService: InsuranceCoverageService
  ) {}

  ngOnInit(): void {
    // Get the insuranceTypeID from the route
    this.insuranceTypeID = +this.route.snapshot.paramMap.get('id');

    // Fetch exclusions for the dropdown
    this.exclusionService.getExclusionsList().subscribe(
      (res: Exclusion[]) => (this.exclusions = res),
      (error) => console.error('Error fetching exclusions:', error)
    );

    // Fetch insurance coverages for the dropdown
    this.insuranceCoverageService.getInsuranceCoverageList().subscribe(
      (res: InsuranceCoverage[]) => (this.insuranceCoverages = res),
      (error) => console.error('Error fetching insurance coverages:', error)
    );

    // Initialize the form
    this.insuranceTypeForm = this.fb.group({
      insuranceDescription: ['', Validators.required],
      deductible: [0, [Validators.required, Validators.min(0)]],
      policyLimitAmount: [0, [Validators.required, Validators.min(0)]],
      insuranceCoverageID: [null, Validators.required],
      exclusionID: [null, Validators.required]
    });

    // Fetch the insurance type data to pre-fill the form
    this.insuranceTypeService.getInsuranceType(this.insuranceTypeID).subscribe(
      (insuranceType: InsuranceType) => {
        this.insuranceTypeForm.patchValue(insuranceType);
        this.insuranceTypeForm.get('insuranceCoverageID')?.setValue(insuranceType.insuranceCoverageID);
        this.insuranceTypeForm.get('exclusionID')?.setValue(insuranceType.exclusionID);
      },
      (error) => console.error('Error fetching insurance type:', error)
    );
  }

  // Submit updated form
  onSubmit(): void {
    if (this.insuranceTypeForm.valid) {
      const updatedInsuranceType: InsuranceType = {
        ...this.insuranceTypeForm.value,
        insuranceTypeID: this.insuranceTypeID
      };
      this.insuranceTypeService.putInsuranceType(updatedInsuranceType).subscribe(
        () => {
          this.router.navigate(['/insurancetype']); // Redirect back to the insurance types list
        },
        (error) => console.error('Error updating insurance type:', error)
      );
    }
  }

  // Cancel the update and redirect to the insurance type list
  onCancel(): void {
    this.router.navigate(['/insurancetype']);
  }

}
