import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})

export class VerticalComponent implements OnInit, AfterViewInit {

  isCondensed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    document.body.setAttribute('data-layout', 'vertical');
    document.body.setAttribute('data-sidebar', 'colored'); 
    document.body.setAttribute('data-sidebar-size', 'small');
    document.body.classList.remove('vertical-collpsed', 'sidebar-enable');
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove('sidebar-enable');
      }
    });
  }
}
