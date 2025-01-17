import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
    {
        path: 'exclusion',
        component: ExclusionComponent
    },
    {
        path: 'exclusion/add',
        component: AddExclusionComponent
    },
    {
        path: 'exclusion/update/:id',
        component: UpdateExclusionComponent
    },
    {
        path: 'insurancecoverage',
        component: InsuranceCoverageComponent
    },
    {
        path: 'insurancecoverage/add',
        component: AddInsuranceCoverageComponent 
    },
    {
        path: 'insurancecoverage/update/:id',
        component: UpdateInsuranceCoverageComponent
    },
    {
        path: 'insurancetype',
        component: InsuranceTypeComponent
    },
    {
        path: 'insurancetype/add',
        component: AddInsuranceTypeComponent 
    },
    {
        path: 'insurancetype/update/:id',
        component: UpdateInsuranceTypeComponent
    },
    {
        path: 'insurancepolicy',
        component: InsurancePolicyComponent
    },
    {
        path: 'insurancepolicy/add',
        component: AddInsurancePolicyComponent
    },
    {
        path: 'insurancepolicy/update/:id',
        component: UpdateInsurancePolicyComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsuranceRoutingModule {}
