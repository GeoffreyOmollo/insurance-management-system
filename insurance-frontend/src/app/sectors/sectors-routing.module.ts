import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage' },
 
  { path: 'homepage', component: HomePageComponent },

  { path: 'insurance', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
