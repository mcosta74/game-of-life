import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    CanvasComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
