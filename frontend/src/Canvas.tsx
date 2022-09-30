import { backend } from "@wailsjs/go/models";
import { useEffect, useRef } from "react";

export interface CanvasProps {
  board?: backend.Board
};

export const Canvas = (props: CanvasProps) => {
  const {board} = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (board === undefined) {
      return;
    }

    const cellSize = ctx.canvas.width/board.columns;

    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.columns; j++) {
        ctx.strokeStyle = '#7f7f7f';
        ctx.fillStyle = '#ffff7f';

        const path = new Path2D();
        path.arc((j+0.5)*cellSize, (i+0.5)*cellSize, cellSize/2, 0, Math.PI*2)

        if (board.cells[i][j]) {
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
    <div className="flex flex-col items-center gap-2">
        <label className="text-lg">Generation: {board?.generation} </label>
        <canvas width="600" height="600" ref={canvasRef} className="">
          Canvas not supported
        </canvas>
    </div>)

};
