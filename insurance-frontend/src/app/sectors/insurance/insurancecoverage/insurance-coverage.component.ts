import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceCoverageService } from './insurance-coverage.service';
import { InsuranceCoverage } from './insurance-coverage.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insurance-coverage',
  templateUrl: './insurance-coverage.component.html',
  styleUrls: ['./insurance-coverage.component.scss']
})
export class InsuranceCoverageComponent implements OnInit {

  coverageForms: FormArray = this.fb.array([]); // Form array for handling insurance coverages
  selectedCoverage: InsuranceCoverage | null = null; // Store the selected coverage for modal
  term: any; // Search term

  constructor(
    private fb: FormBuilder,
    private coverageService: InsuranceCoverageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // Fetch all insurance coverages
    this.coverageService.getInsuranceCoverageList().subscribe(
      (res: InsuranceCoverage[]) => {
        res.forEach((coverage: InsuranceCoverage) => {
          this.coverageForms.push(this.fb.group({
            insuranceCoverageID: [coverage.insuranceCoverageID],
            coverageDescription: [coverage.coverageDescription, Validators.required]
          }));
        });
      }
    );
  }

  // Delete insurance coverage with confirmation
  onDelete(coverageID: number | undefined): void {
    if (coverageID) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          this.coverageService.deleteInsuranceCoverage(coverageID).subscribe(() => {
            // Find and remove the deleted coverage from the form array
            const index = this.coverageForms.controls.findIndex(control => control.get('insuranceCoverageID')?.value === coverageID);
            if (index > -1) {
              this.coverageForms.removeAt(index);
            }
            Swal.fire('Deleted!', 'The insurance coverage has been deleted.', 'success');
            this.modalService.dismissAll(); // Close modal after deletion
          });
        }
      });
    }
  }

  // Open the modal for a specific insurance coverage
  openModal(content: any, coverage: InsuranceCoverage): void {
    this.selectedCoverage = coverage; // Set the selected coverage
    this.modalService.open(content, { centered: true });
  }
}
