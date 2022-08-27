export interface ICellGrid {
    getNeighbours(x: number, y: number): { x: number, y: number, isAlive: boolean }[];

    isAlive(x: number, y: number): boolean;

    getSize(): number;

    setLiveCells(cells: { x: number, y: number }[]): void;
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
        return this.cells[x]?.[y] || false;
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
            this.cells[x][y] = true;
        }
    };

    getNeighbours(x: number, y: number): { x: number, y: number, isAlive: boolean }[] {
        const ds = [-1, 0, 1].flatMap((v, i, a) => a.map(v2 => ({ dx: v, dy: v2 })))
            .filter(d => !(d.dx == 0 && d.dy == 0))

        return ds.map(({ dx, dy }) => ({
            x: x + dx,
            y: y + dy,
            isAlive: this.isAlive(x + dx, y + dy)
        }));
    }
}