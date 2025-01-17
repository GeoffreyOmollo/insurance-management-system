import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InsuranceType } from './insurance-type.model';
import { InsuranceTypeService } from './insurance-type.service';
import { InsuranceCoverage } from '../insurancecoverage/insurance-coverage.model';
import { InsuranceCoverageService } from '../insurancecoverage/insurance-coverage.service';
import { Exclusion } from '../exclusion/exclusion.model';
import { ExclusionService } from '../exclusion/exclusion.service';

@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.scss']
})
export class InsuranceTypeComponent implements OnInit {

  insuranceTypeForms: FormArray = this.fb.array([]);
  insuranceCoverages: InsuranceCoverage[] = [];
  exclusions: Exclusion[] = [];
  selectedInsuranceType: InsuranceType | null = null;
  term: any;

  constructor(
    private fb: FormBuilder,
    private insuranceTypeService: InsuranceTypeService,
    private insuranceCoverageService: InsuranceCoverageService,
    private exclusionService: ExclusionService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // Fetch available insurance coverages
    this.insuranceCoverageService.getInsuranceCoverageList().subscribe(
      res => this.insuranceCoverages = res
    );

    // Fetch available exclusions
    this.exclusionService.getExclusionsList().subscribe(
      res => this.exclusions = res
    );

    // Fetch insurance types and populate the form array
    this.insuranceTypeService.getInsuranceTypesList().subscribe(
      res => {
        res.forEach((insuranceType: InsuranceType) => {
          this.insuranceTypeForms.push(this.fb.group({
            insuranceTypeID: [insuranceType.insuranceTypeID],
            insuranceDescription: [insuranceType.insuranceDescription, Validators.required],
            deductible: [insuranceType.deductible, [Validators.required, Validators.min(0)]],
            policyLimitAmount: [insuranceType.policyLimitAmount, [Validators.required, Validators.min(0)]],
            insuranceCoverageID: [insuranceType.insuranceCoverageID, Validators.required],
            exclusionID: [insuranceType.exclusionID, Validators.required]
          }));
        });
      }
    );
  }

  // Get insurance coverage name based on the ID
  getInsuranceCoverageName(insuranceCoverageID: number | undefined): string {
    const coverage = this.insuranceCoverages.find(c => c.insuranceCoverageID === insuranceCoverageID);
    return coverage ? coverage.coverageDescription : 'Unknown Coverage';
  }

  // Get exclusion name based on the ID
  getExclusionName(exclusionID: number | undefined): string {
    const exclusion = this.exclusions.find(e => e.exclusionID === exclusionID);
    return exclusion ? exclusion.exclusionDescription : 'Unknown Exclusion';
  }

  // Method to delete an insurance type
  onDelete(insuranceTypeID: number | undefined) {
    if (insuranceTypeID && confirm('Are you sure to delete this insurance type?')) {
      this.insuranceTypeService.deleteInsuranceType(insuranceTypeID).subscribe(
        () => {
          const index = this.insuranceTypeForms.controls.findIndex(control => control.get('insuranceTypeID')?.value === insuranceTypeID);
          if (index > -1) {
            this.insuranceTypeForms.removeAt(index);
          }
          this.modalService.dismissAll();  // Close the modal after deleting
        }
      );
    }
  }

  // Open modal and set the selected insurance type
  openModal(content: any, insuranceType: InsuranceType) {
    this.selectedInsuranceType = insuranceType;
    this.modalService.open(content, { centered: true });
  }

}
