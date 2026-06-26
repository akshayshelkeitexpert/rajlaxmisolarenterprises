import { Component, inject, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './layout/app-header.component';
import { AppFooterComponent } from './layout/app-footer.component';
import { EbusinessWidgetsService } from './core/ebusiness-widgets.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly widgets = inject(EbusinessWidgetsService);

  ngAfterViewInit(): void {
    this.widgets.initAfterBootstrap();
  }
}
