import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgOtpInputModule } from  'ng-otp-input';

import { ErrorPagesRoutingModule } from './errorpages-routing.module';

import { Page404Component } from './page404/page404.component';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [Page404Component],
  imports: [
    CommonModule,
    CarouselModule,
    ErrorPagesRoutingModule,
    NgOtpInputModule
  ]
})
export class ErrorPagesModule { }
