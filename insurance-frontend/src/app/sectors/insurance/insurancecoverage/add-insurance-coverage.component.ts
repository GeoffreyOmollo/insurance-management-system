import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { InsuranceCoverageService } from './insurance-coverage.service';

@Component({
  selector: 'app-add-insurance-coverage',
  templateUrl: './add-insurance-coverage.component.html',
  styleUrls: ['./add-insurance-coverage.component.scss']
})
export class AddInsuranceCoverageComponent {
  coverageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coverageService: InsuranceCoverageService,
    private router: Router
  ) {
    this.coverageForm = this.fb.group({
      coverageDescription: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.coverageForm.valid) {
      this.coverageService.postInsuranceCoverage(this.coverageForm.value).subscribe(
        () => {
          // Display SweetAlert success notification
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Insurance coverage has been successfully saved!',
            showConfirmButton: false,
            timer: 1500
          });

          // Navigate back to the insurance coverage list
          this.router.navigate(['/insurancecoverage']);
        },
        (error) => console.error('Error adding insurance coverage:', error)
      );
    }
  }

  // Cancel and navigate back to the insurance coverage list
  onCancel() {
    this.router.navigate(['/insurancecoverage']);
  }
}
