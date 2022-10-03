import { ICellGrid } from "./CellGrid";
import { count } from "./count";
import { Game } from './Game';

const generationLength = 100; // 5s

let generationAge = 0;

function playModeUpdate(game: ICellGrid, delta: number, ctx: CanvasRenderingContext2D) {
    generationAge += delta;

    if (generationAge > generationLength) {
        generationAge = 0;

        let nextGenerationCells: { x: number, y: number }[] = [];

        for (let i = 0; i < game.getSize(); i++) {
            for (let j = 0; j < game.getSize(); j++) {
                const neighbours = game.getNeighbours(i, j);
                const countLiveNeighbors = count(neighbours, ({ isAlive }) => isAlive);

                if (game.isAlive(i, j)) {
                    if (countLiveNeighbors == 2 || countLiveNeighbors == 3) {
                        nextGenerationCells.push({ x: i, y: j });
                    }
                } else {
                    if (countLiveNeighbors == 3) {
                        nextGenerationCells.push({ x: i, y: j });
                    }
                }
            }
        }

        game.setLiveCells(nextGenerationCells);
    }
}

function pauseModeUpdate(game: Game, delta: number, ctx: CanvasRenderingContext2D) {
    const { clickEvent, cellScale } = game;

    if (clickEvent) {
        const { x, y } = clickEvent;
        const cellX = Math.floor(x / cellScale);
        const cellY = Math.floor(y / cellScale);

        console.log(`Clicked on canvas at x: ${x} y: ${y}. This is cell x: ${cellX} y: ${cellY}`);

        game.cells.toggleCell(cellX, cellY);
    }
    console.log(game.mousePosition);
}

export const update = (game: Game, delta: number, ctx: CanvasRenderingContext2D) => {
    if (game.mode === 'Play') {
        playModeUpdate(game.cells, delta, ctx);
    } else {
        pauseModeUpdate(game, delta, ctx);
    }
}