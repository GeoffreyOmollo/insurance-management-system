import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExclusionService } from './exclusion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exclusion',
  templateUrl: './add-exclusion.component.html',
  styleUrls: ['./add-exclusion.component.scss']
})
export class AddExclusionComponent {
  exclusionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exclusionService: ExclusionService,
    private router: Router
  ) {
    this.exclusionForm = this.fb.group({
      exclusionDescription: ['', Validators.required] // Required field for exclusion description
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.exclusionForm.valid) {
      this.exclusionService.postExclusion(this.exclusionForm.value).subscribe(
        () => {
          // SweetAlert success notification
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exclusion has been successfully saved!',
            showConfirmButton: false,
            timer: 1500
          });

          // Navigate back to the exclusions list after success
          this.router.navigate(['/exclusion']);
        },
        (error) => console.error('Error adding exclusion:', error)
      );
    }
  }

  // Navigate back to the exclusions list on cancel
  onCancel() {
    this.router.navigate(['/exclusion']);
  }
}
