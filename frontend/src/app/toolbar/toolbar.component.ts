import { Component, computed, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  private boardService = inject(BoardService);

  startButtonText = computed(() => this.boardService.running() ? "Stop" : "Start");

  toggleStatus() {
    this.boardService.toggleStatus();
  }

  reset() {
    this.boardService.reset();
  }

  next() {
    this.boardService.next();
  }
}
