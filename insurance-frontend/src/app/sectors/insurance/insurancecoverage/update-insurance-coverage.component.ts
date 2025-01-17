import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceCoverageService } from './insurance-coverage.service';
import { InsuranceCoverage } from './insurance-coverage.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-insurance-coverage',
  templateUrl: './update-insurance-coverage.component.html',
  styleUrls: ['./update-insurance-coverage.component.scss']
})
export class UpdateInsuranceCoverageComponent implements OnInit {
  coverageForm: FormGroup;
  coverageId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coverageService: InsuranceCoverageService
  ) {}

  ngOnInit(): void {
    // Get the insuranceCoverageID from the route
    this.coverageId = +this.route.snapshot.paramMap.get('id');

    // Initialize the form
    this.coverageForm = this.fb.group({
      coverageDescription: ['', Validators.required],
    });

    // Fetch the insurance coverage data to pre-fill the form
    this.coverageService.getInsuranceCoverage(this.coverageId).subscribe((coverage: InsuranceCoverage) => {
      this.coverageForm.patchValue(coverage);
    });
  }

  // Submit updated form
  onSubmit(): void {
    if (this.coverageForm.valid) {
      const updatedCoverage: InsuranceCoverage = {
        ...this.coverageForm.value,
        insuranceCoverageID: this.coverageId,
      };

      this.coverageService.putInsuranceCoverage(updatedCoverage).subscribe(() => {
        // Show success notification with SweetAlert2
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Insurance coverage has been updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate back to the insurance coverage list
        this.router.navigate(['/insurancecoverage']);
      });
    }
  }

  // Cancel the update and redirect to the insurance coverage list
  onCancel(): void {
    this.router.navigate(['/insurancecoverage']);
  }
}
