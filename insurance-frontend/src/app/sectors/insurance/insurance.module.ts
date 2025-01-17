import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';

import { InsuranceRoutingModule } from './insurance-routing.module';

import { ExclusionComponent } from './exclusion/exclusion.component';
import { AddExclusionComponent } from './exclusion/add-exclusion.component';
import { UpdateExclusionComponent } from './exclusion/update-exclusion.component';

import { InsuranceCoverageComponent } from './insurancecoverage/insurance-coverage.component';
import { AddInsuranceCoverageComponent } from './insurancecoverage/add-insurance-coverage.component';
import { UpdateInsuranceCoverageComponent } from './insurancecoverage/update-insurance-coverage.component';

import { InsuranceTypeComponent } from './insurancetype/insurance-type.component';
import { AddInsuranceTypeComponent } from './insurancetype/add-insurance-type.component';
import { UpdateInsuranceTypeComponent } from './insurancetype/update-insurance-type.component';

import { InsurancePolicyComponent } from './insurancepolicy/insurance-policy.component';
import { AddInsurancePolicyComponent } from './insurancepolicy/add-insurance-policy.component';
import { UpdateInsurancePolicyComponent } from './insurancepolicy/update-insurance-policy.component';

const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ExclusionComponent, AddExclusionComponent, UpdateExclusionComponent, InsuranceCoverageComponent, AddInsuranceCoverageComponent, UpdateInsuranceCoverageComponent, InsuranceTypeComponent, AddInsuranceTypeComponent, UpdateInsuranceTypeComponent, InsurancePolicyComponent, AddInsurancePolicyComponent, UpdateInsurancePolicyComponent ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    }
  ]
})
export class InsuranceModule { }
