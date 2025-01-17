import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { ExclusionService } from './exclusion.service';
import { Exclusion } from './exclusion.model';

@Component({
  selector: 'app-exclusion',
  templateUrl: './exclusion.component.html',
  styleUrls: ['./exclusion.component.scss']
})
export class ExclusionComponent implements OnInit {
  exclusionForms: FormArray = this.fb.array([]);
  selectedExclusion: Exclusion | null = null;
  term: any;

  constructor(
    private fb: FormBuilder,
    private exclusionService: ExclusionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // Fetch the list of exclusions and populate the form array
    this.exclusionService.getExclusionsList().subscribe((res: Exclusion[]) => {
      res.forEach((exclusion: Exclusion) => {
        this.exclusionForms.push(
          this.fb.group({
            exclusionID: [exclusion.exclusionID],
            exclusionDescription: [exclusion.exclusionDescription, Validators.required]
          })
        );
      });
    });
  }

  onDelete(exclusionID: number | undefined) {
    if (exclusionID) {
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
          this.exclusionService.deleteExclusion(exclusionID).subscribe(() => {
            const index = this.exclusionForms.controls.findIndex(
              control => control.get('exclusionID')?.value === exclusionID
            );
            if (index > -1) {
              this.exclusionForms.removeAt(index);
            }
            Swal.fire('Deleted!', 'The exclusion has been deleted.', 'success');
            this.modalService.dismissAll(); 
          });
        }
      });
    }
  }

  openModal(content: any, exclusion: Exclusion) {
    this.selectedExclusion = exclusion; 
    this.modalService.open(content, { centered: true });
  }
}
