import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './components/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize!: string;
  config!: { [key: string]: string };

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    setTimeout(() => {
      this.config = {
        title: 'Ecommerce',
        footer: ' © Ecommerce, All rights reserved.',
        date: new Date().toDateString(),
      };
    }, 500);
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
