import { ICellGrid } from './CellGrid';

export type Mode = 'Play' | 'Pause';

export interface Game {
    cells: ICellGrid,
    mode: Mode,
    mousePosition: { x: number, y: number },
    clickEvent: { x: number, y: number } | undefined,
    cellScale: number,
    prototype: 'Glider'| 'Glider Gun' | undefined;
}