import { Component, inject, OnInit } from '@angular/core';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CanvasComponent } from './canvas/canvas.component';

import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    CanvasComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  title = 'frontend';

  ngOnInit(): void {
      this.themeService.initTheme();
  }
}
