import { Injectable, signal } from '@angular/core';

import {EventsOn} from '@wailsjs/runtime';
import { backend } from '@wailsjs/go/models';
import {Reset, Next, ToggleStatus} from '@wailsjs/go/backend/App';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  running = signal<boolean>(false);
  board = signal<backend.Board>(new backend.Board());

  constructor() {
    this.reset();
    EventsOn('dataUpdate', (board) => {
      this.board.set(board);
    });
  }

  toggleStatus() {
    ToggleStatus().then((status) => {
      this.running.set(status);
    });
  }

  reset() {
    Reset().then((board) => {
      this.board.set(board);
    });
  }

  next() {
    Next().then(() => {});
  }
}
