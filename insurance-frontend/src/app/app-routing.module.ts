import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './errorpages/page404/page404.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./sectors/sectors.module').then(m => m.SectorsModule) },
  { path: 'sectors', loadChildren: () => import('./errorpages/errorpages.module').then(m => m.ErrorPagesModule) },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
