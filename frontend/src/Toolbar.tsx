export interface ToolbarProps {
  running: boolean,
  onStartStop: () => void;
  onReset: () => void;
}

export const Toolbar = (props: ToolbarProps) => {
  const startButtonText = (props.running) ? "Stop": "Start";

  return (
    <div className="flex flex-row gap-4">
      <button id="start-button" className="btn btn-primary" onClick={props.onStartStop}>
        {startButtonText}
      </button>
      <button className="btn btn-primary" disabled={props.running} onClick={props.onReset}>
        Reset
      </button>
    </div>
  );
}
