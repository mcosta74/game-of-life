// import logo from '@assets/images/logo-universal.png';

import { useEffect, useState } from "react";
import { Canvas, CanvasProps } from "./Canvas"
import { Toolbar, ToolbarProps } from "./Toolbar"

import {Reset, ToggleStatus} from "@wailsjs/go/backend/App";

import {backend} from "@wailsjs/go/models";
import {EventsOn} from "@wailsjs/runtime";


function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [columns, setColumns] = useState<number>(100);
    const [rows, setRows] = useState<number>(100);
    const [cells, setCells] = useState<boolean[][] | null>(null);

    useEffect(() => {
        const loadData = () => {
            Reset().then((data: backend.Board) => {
                setColumns(data.columns);
                setRows(data.rows);
                setCells(data.cells);
            });
        };

        loadData();
    }, []);

    EventsOn("dataUpdate", (board: backend.Board) => setCells(board.cells));

    const onStartStop = () => {
        ToggleStatus().then(status => setRunning(status));
    };

    const onReset = () => {
        Reset().then((data: backend.Board) => {
            setCells(data.cells);
        });
    }

    const toolbarProps: ToolbarProps = {
        running,
        onStartStop,
        onReset,
    };

    const canvasProps: CanvasProps = {
        columns,
        rows,
        cells,
    };

    return (
        <div id="App" className="flex flex-col items-center gap-4 p-8">
            <Toolbar {...toolbarProps} />
            <Canvas {...canvasProps} />
        </div>
    )
}

export default App
