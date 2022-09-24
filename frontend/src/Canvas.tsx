import { useEffect, useRef } from "react";

import { LogDebug } from '@wailsjs/runtime';

export interface CanvasProps {
  columns: number;
  rows: number;
  cells: boolean[][] | null;
};

export const Canvas = (props: CanvasProps) => {
  const {columns, rows, cells} = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (cells === null) {
      return;
    }

    const cellSize = ctx.canvas.width/columns;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        ctx.strokeStyle = '#7f7f7f';
        ctx.fillStyle = '#ffff7f';

        const path = new Path2D();
        path.arc((j+0.5)*cellSize, (i+0.5)*cellSize, cellSize/2, 0, Math.PI*2)

        if (cells[i][j]) {
          ctx.fill(path);
        } else {
          ctx.stroke(path);
        }
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }
    
    draw(ctx);
  }, [canvasRef.current, draw]);

  return (
    <canvas width="600" height="600" ref={canvasRef} className="">
      Canvas not supported
    </canvas>
  )
};
