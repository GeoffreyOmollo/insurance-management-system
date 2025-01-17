import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ExclusionService } from './exclusion.service';
import { Exclusion } from './exclusion.model';

@Component({
  selector: 'app-update-exclusion',
  templateUrl: './update-exclusion.component.html',
  styleUrls: ['./update-exclusion.component.scss']
})
export class UpdateExclusionComponent implements OnInit {
  exclusionForm: FormGroup;
  exclusionId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exclusionService: ExclusionService
  ) {}

  ngOnInit(): void {
    // Get the exclusionId from the route
    this.exclusionId = +this.route.snapshot.paramMap.get('id');

    // Initialize the form
    this.exclusionForm = this.fb.group({
      exclusionDescription: ['', Validators.required]
    });

    // Fetch the exclusion data to pre-fill the form
    this.exclusionService.getExclusion(this.exclusionId).subscribe((exclusion: Exclusion) => {
      this.exclusionForm.patchValue(exclusion);
    });
  }

  // Submit the updated exclusion form using putExclusion()
  onSubmit(): void {
    if (this.exclusionForm.valid) {
      const updatedExclusion: Exclusion = { 
        ...this.exclusionForm.value, 
        exclusionID: this.exclusionId 
      };

      // Call putExclusion to handle the update
      this.exclusionService.putExclusion(updatedExclusion).subscribe(() => {
        // Show success notification with SweetAlert2
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exclusion has been updated successfully!',
          showConfirmButton: false,
          timer: 1500
        });

        // Navigate back to the exclusions list
        this.router.navigate(['/exclusion']);
      });
    }
  }

  // Cancel the update and redirect to the exclusions list
  onCancel(): void {
    this.router.navigate(['/exclusion']);
  }
}
