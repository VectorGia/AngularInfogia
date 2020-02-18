import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private aS: AuthService) {}

  id: string;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  reason = '';

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.id = localStorage.getItem('token');
    console.log(this.id);
  }
  logout() {
    console.log('logout');
    this.aS.logout();
    this.router.navigate(['/auth/login'])
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
