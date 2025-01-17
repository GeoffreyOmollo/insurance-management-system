import { Component, OnInit, AfterViewInit } from '@angular/core';

import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_WIDTH, TOPBAR
} from './layouts.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit, AfterViewInit {

  // layout related config
  layoutType: string;
  layoutwidth: string;
  topbar: string;

  constructor() { }

  ngOnInit() {
    // default settings
    this.layoutType = LAYOUT_VERTICAL;
    this.layoutwidth = LAYOUT_WIDTH;
    this.topbar = TOPBAR;

  }

  ngAfterViewInit() {
  }

}
