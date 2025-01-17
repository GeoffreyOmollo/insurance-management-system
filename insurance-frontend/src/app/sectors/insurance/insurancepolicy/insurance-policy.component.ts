import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InsurancePolicy } from './insurance-policy.model';
import { InsurancePolicyService } from './insurance-policy.service';
import { InsuranceType } from '../insurancetype/insurance-type.model';
import { InsuranceTypeService } from '../insurancetype/insurance-type.service';

@Component({
  selector: 'app-insurance-policy',
  templateUrl: './insurance-policy.component.html',
  styleUrls: ['./insurance-policy.component.scss']
})
export class InsurancePolicyComponent implements OnInit {

  policyForms: FormArray = this.fb.array([]);
  insuranceTypes: InsuranceType[] = [];
  selectedPolicy: InsurancePolicy | null = null; // Store the selected policy
  term: any;

  constructor(
    private fb: FormBuilder,
    private insurancePolicyService: InsurancePolicyService,
    private insuranceTypeService: InsuranceTypeService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // Fetch insurance types for the dropdown
    this.insuranceTypeService.getInsuranceTypesList().subscribe(
      res => this.insuranceTypes = res,
      error => console.error('Error fetching insurance types:', error)
    );

    // Fetch the list of insurance policies and populate the form array
    this.insurancePolicyService.getInsurancePoliciesList().subscribe(
      res => {
        res.forEach((policy: InsurancePolicy) => {
          this.policyForms.push(this.fb.group({
            insurancePolicyID: [policy.insurancePolicyID],
            policyHolder: [policy.policyHolder, Validators.required],
            insuranceTypeID: [policy.insuranceTypeID, Validators.required],
            premiumAmount: [policy.premiumAmount, [Validators.required, Validators.min(0)]]
          }));
        });
      },
      error => console.error('Error fetching insurance policies:', error)
    );
  }

  // Method to get the insurance type name based on the ID
  getInsuranceTypeName(insuranceTypeID: number | undefined): string {
    const type = this.insuranceTypes.find(t => t.insuranceTypeID === insuranceTypeID);
    return type ? type.insuranceDescription : 'Unknown Type';
  }

  // Method to delete an insurance policy
  onDelete(insurancePolicyID: number | undefined) {
    if (insurancePolicyID && confirm('Are you sure to delete this policy?')) {
      this.insurancePolicyService.deleteInsurancePolicy(insurancePolicyID).subscribe(
        () => {
          const index = this.policyForms.controls.findIndex(control => control.get('insurancePolicyID')?.value === insurancePolicyID);
          if (index > -1) {
            this.policyForms.removeAt(index);
          }
          this.modalService.dismissAll(); // Close the modal after deleting
        },
        error => console.error('Error deleting insurance policy:', error)
      );
    }
  }

  // Method to open the modal and set the selected policy
  openModal(content: any, policy: InsurancePolicy) {
    this.selectedPolicy = policy; // Set the selected policy
    this.modalService.open(content, { centered: true });
  }
}
