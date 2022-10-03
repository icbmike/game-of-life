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
    const { clickEvent, cellScale, prototype } = game;

    if (clickEvent) {
        const { x, y } = clickEvent;
        const cellX = Math.floor(x / cellScale);
        const cellY = Math.floor(y / cellScale);

        console.log(`Clicked on canvas at x: ${x} y: ${y}. This is cell x: ${cellX} y: ${cellY}`);
   
        if(prototype == 'Glider') {
            game.cells.setDeadCell(cellX, cellY);
            game.cells.setLiveCell(cellX + 1, cellY);
            game.cells.setDeadCell(cellX + 2, cellY);
            
            game.cells.setDeadCell(cellX, cellY + 1);
            game.cells.setDeadCell(cellX + 1, cellY + 1);
            game.cells.setLiveCell(cellX + 2, cellY + 1);

            game.cells.setLiveCell(cellX, cellY + 2);
            game.cells.setLiveCell(cellX + 1, cellY + 2);
            game.cells.setLiveCell(cellX + 2, cellY + 2);
        }
        else if(prototype == 'Glider Gun'){
            const prototypeCells = new Array<boolean[]>(38);
            for(let i = 0; i < 38; i++){
                prototypeCells[i] = new Array<boolean>(11);

                for(let j = 0; j < 11; j++){
                    prototypeCells[i][j] = false;
                }
            }

            //1st part
            prototypeCells[1][5] = true;
            prototypeCells[1][6] = true;
            prototypeCells[2][5] = true;
            prototypeCells[2][6] = true;

            //2nd part
            prototypeCells[11][5] = true;
            prototypeCells[11][6] = true;
            prototypeCells[11][7] = true;

            prototypeCells[12][4] = true;
            prototypeCells[12][8] = true;

            prototypeCells[13][3] = true;
            prototypeCells[14][3] = true;
            prototypeCells[13][9] = true;
            prototypeCells[14][9] = true;

            prototypeCells[15][6] = true;
            prototypeCells[16][4] = true;
            prototypeCells[16][8] = true;

            prototypeCells[17][5] = true;
            prototypeCells[17][6] = true;
            prototypeCells[17][7] = true;
            prototypeCells[18][6] = true;

            //3rd part
            prototypeCells[25][1] = true;
            prototypeCells[25][2] = true;
            prototypeCells[25][6] = true;
            prototypeCells[25][7] = true;

            prototypeCells[21][3] = true;
            prototypeCells[21][4] = true;
            prototypeCells[21][5] = true;
            prototypeCells[22][3] = true;
            prototypeCells[22][4] = true;
            prototypeCells[22][5] = true;
            
            prototypeCells[23][2] = true;
            prototypeCells[23][6] = true;

            //4th part
            prototypeCells[35][3] = true;
            prototypeCells[36][3] = true;
            prototypeCells[35][4] = true;
            prototypeCells[36][4] = true;

            for(let i = 0; i < 38; i++){
                for(let j = 0; j < 11; j++){
                    if(prototypeCells[i][j]){
                        game.cells.setLiveCell(cellX + i, cellY + j)
                    } else {
                        game.cells.setDeadCell(cellX + i, cellY + j)
                    }
                }
            }
        } 
        else {        
            game.cells.toggleCell(cellX, cellY);
        }
    }
}

export const update = (game: Game, delta: number, ctx: CanvasRenderingContext2D) => {
    if (game.mode === 'Play') {
        playModeUpdate(game.cells, delta, ctx);
    } else {
        pauseModeUpdate(game, delta, ctx);
    }
}