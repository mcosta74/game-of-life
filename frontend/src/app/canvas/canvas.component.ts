import { Component, computed, effect, ElementRef, inject, viewChild } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private boardService = inject(BoardService);
  board = this.boardService.board;

  constructor() { 
    effect(() => {
      const ctx = this.canvas().nativeElement.getContext("2d");
      if (ctx === null) {
        return;
      }
      this.draw(ctx);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var style = window.getComputedStyle(document.body);

    if (this.boardService.board() === undefined) {
      return;
    }

    const cellSize = ctx.canvas.width / this.boardService.board().columns;

    for (let i = 0; i < this.boardService.board().rows; i++) {
      for (let j = 0; j < this.boardService.board().columns; j++) {
        ctx.strokeStyle = style.getPropertyValue(
          '--cds-alias-object-interaction-background-active'
        );
        ctx.fillStyle = style.getPropertyValue('--cds-alias-status-warning');

        const path = new Path2D();
        path.arc(
          (j + 0.5) * cellSize,
          (i + 0.5) * cellSize,
          cellSize / 2,
          0,
          Math.PI * 2
        );

        if (this.boardService.board().cells[i][j]) {
          ctx.fill(path);
        } else {
          ctx.stroke(path);
        }
      }
    }
  }
}
