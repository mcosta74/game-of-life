import { Component, computed, inject } from '@angular/core';

import '@cds/core/icon/register.js';
import {ClarityIcons, playIcon, stopIcon, stepForwardIcon, pauseIcon} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';

import { BoardService } from '../board.service';

ClarityIcons.addIcons(playIcon, stopIcon, stepForwardIcon, pauseIcon);

@Component({
  selector: 'app-toolbar',
  imports: [
    ClarityModule
  ],
  templateUrl: './toolbar.component.html',
  styles: ``,
})
export class ToolbarComponent {

  private boardService = inject(BoardService);

  startButtonShape = computed(() => this.boardService.running() ? "pause": "play");

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
