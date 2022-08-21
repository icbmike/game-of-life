export interface IGame {
    isAlive(x: number, y: number): boolean;
    getSize(): number;
}

export class Game implements IGame {
    private cells: boolean[][];

    constructor(
        private size: number,
        startingCells: { x: number, y: number }[]
    ) {
        this.cells = new Array<boolean[]>(size);

        for (let i = 0; i < size; i++) {

            this.cells[i] = new Array<boolean>(size);

            for (let j = 0; j < size; j++) {
                this.cells[i][j] = false;
            }
        }

        for (let index = 0; index < startingCells.length; index++) {
            const { x, y } = startingCells[index];
            this.cells[x][y] = true;
        }
    }

    isAlive(x: number, y: number): boolean {
        return this.cells[x][y];
    }

    getSize(): number {
        return this.size;
    }
}