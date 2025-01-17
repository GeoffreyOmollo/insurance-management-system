import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from './menu.model';
import { MENU } from './menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  @Input() isCondensed = false;
  menuItems: MenuItem[] = MENU;

  constructor() {}

  ngOnInit() {}
}
