export interface ICellGrid {
    getNeighbours(x: number, y: number): { x: number, y: number, isAlive: boolean }[];

    isAlive(x: number, y: number): boolean;

    getSize(): number;

    setLiveCells(cells: { x: number, y: number }[]): void;

    toggleCell(x: number, y: number): void;
}

export class CellGrid implements ICellGrid {
    private cells: boolean[][];

    constructor(
        private size: number,
        startingCells: { x: number, y: number }[]
    ) {
        this.cells = new Array<boolean[]>(this.size);
        this.setLiveCells(startingCells);
    }

    isAlive(x: number, y: number): boolean {

        const indexX = this.toIndexCoord(x);
        const indexY = this.toIndexCoord(y);

        return this.cells[indexX]?.[indexY] || false;
    }

    getSize(): number {
        return this.size;
    }

    setLiveCells(cells: { x: number, y: number }[]) {
        for (let i = 0; i < this.size; i++) {

            this.cells[i] = new Array<boolean>(this.size);

            for (let j = 0; j < this.size; j++) {
                this.cells[i][j] = false;
            }
        }

        for (let index = 0; index < cells.length; index++) {
            const { x, y } = cells[index];

            this.cells[this.toIndexCoord(x)][this.toIndexCoord(y)] = true;
        }
    };

    toggleCell(x: number, y: number) {
        this.cells[x][y] = !this.cells[x][y];
    }

    getNeighbours(x: number, y: number): { x: number, y: number, isAlive: boolean }[] {
        const ds = [-1, 0, 1].flatMap((v, i, a) => a.map(v2 => ({ dx: v, dy: v2 })))
            .filter(d => !(d.dx == 0 && d.dy == 0))

        return ds.map(({ dx, dy }) => ({
            x: this.toIndexCoord(x + dx),
            y: this.toIndexCoord(y + dy),
            isAlive: this.isAlive(x + dx, y + dy)
        }));
    }

    private toIndexCoord(n: number) {
        return (n < 0 ? this.size + n : n) % this.size;
    }
}