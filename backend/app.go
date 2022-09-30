package backend

import (
	"context"
	"math/rand"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	stepInterval = 100 * time.Millisecond
	boardSize    = 100
)

type Cells = [][]bool

type Board struct {
	Columns    int   `json:"columns"`
	Rows       int   `json:"rows"`
	Cells      Cells `json:"cells"`
	previous   Cells `json:"-"`
	Generation int   `json:"generation"`
}

func (b *Board) copyPrevious() {
	b.previous = make([][]bool, b.Rows)
	for i := 0; i < b.Rows; i++ {
		b.previous[i] = make([]bool, b.Columns)
		copy(b.previous[i], b.Cells[i])
	}
}

func (b *Board) isAlive(r, c int) bool {
	if r >= 0 && r < b.Rows && c >= 0 && c < b.Columns {
		return b.previous[r][c]
	}
	return false
}

func (b *Board) aliveNeighbors(r, c int) (count int) {
	var neighbors = [][]int{
		{r - 1, c - 1},
		{r - 1, c},
		{r - 1, c + 1},
		{r, c - 1},
		{r, c + 1},
		{r + 1, c - 1},
		{r + 1, c},
		{r + 1, c + 1},
	}

	for _, coord := range neighbors {
		if b.isAlive(coord[0], coord[1]) {
			count++
		}
	}
	return
}

// App struct
type App struct {
	ctx     context.Context
	board   Board
	running bool
	ticker  *time.Ticker
	done    chan struct{}
}

// NewApp creates a new App application struct
func NewApp() *App {
	rand.Seed(time.Now().Unix())

	app := &App{
		ticker: time.NewTicker(stepInterval),
		done:   make(chan struct{}),
	}
	app.board.Columns = boardSize
	app.board.Rows = boardSize
	app.board.Cells = make([][]bool, app.board.Rows)
	for i := 0; i < app.board.Rows; i++ {
		app.board.Cells[i] = make([]bool, app.board.Columns)
	}
	app.ticker.Stop()

	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Reset() Board {
	if a.running {
		runtime.LogWarning(a.ctx, "cannot reset while is running")
	} else {
		a.randomize()
	}
	a.board.Generation = 0
	return a.board
}

func (a *App) randomize() {
	for i := 0; i < a.board.Rows; i++ {
		for j := 0; j < a.board.Columns; j++ {
			a.board.Cells[i][j] = (rand.Intn(4) == 0)
		}
	}
}

func (a *App) ToggleStatus() (running bool) {
	a.running = !a.running

	if a.running {
		a.ticker.Reset(stepInterval)
		go a.play()
	} else {
		a.ticker.Stop()
		a.done <- struct{}{}
	}

	return a.running
}

func (a *App) play() {
	for {
		select {
		case <-a.done:
			return

		case <-a.ticker.C:
			a.nextGeneration()
			runtime.EventsEmit(a.ctx, "dataUpdate", a.board)
		}
	}
}

func (a *App) nextGeneration() {
	a.board.copyPrevious()

	for i := 0; i < a.board.Rows; i++ {
		for j := 0; j < a.board.Columns; j++ {
			alive := a.board.aliveNeighbors(i, j)
			if a.board.previous[i][j] {
				a.board.Cells[i][j] = (alive == 2 || alive == 3)
			} else {
				a.board.Cells[i][j] = (alive == 3)
			}
		}
	}
	a.board.Generation++
}

func (a *App) Next() {
	a.nextGeneration()
	runtime.EventsEmit(a.ctx, "dataUpdate", a.board)
}
