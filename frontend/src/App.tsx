// import logo from '@assets/images/logo-universal.png';

import { useEffect, useState } from "react";
import { Canvas, CanvasProps } from "./Canvas"
import { Toolbar, ToolbarProps } from "./Toolbar"

import {Reset, ToggleStatus, Next} from "@wailsjs/go/backend/App";

import {backend} from "@wailsjs/go/models";
import {EventsOn} from "@wailsjs/runtime";



function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [board, setBoard] = useState<backend.Board>(new backend.Board());

    useEffect(() => {
        const loadData = () => {
            Reset().then((data: backend.Board) => setBoard(data));
        };
        loadData();
    }, []);

    EventsOn("dataUpdate", (board: backend.Board) => setBoard(board));

    const onStartStop = () => {
        ToggleStatus().then(status => setRunning(status));
    };

    const onReset = () => {
        Reset().then((data: backend.Board) => setBoard(data));
    }

    const onNext = () => {
        Next().then(() => {});
    }

    const toolbarProps: ToolbarProps = {
        running,
        onStartStop,
        onReset,
        onNext,
    };

    const canvasProps: CanvasProps = {
        board
    };

    return (
        <div id="App" className="flex flex-col items-center gap-4 p-8">
            <Toolbar {...toolbarProps} />
            <Canvas {...canvasProps} />
        </div>
    )
}

export default App
