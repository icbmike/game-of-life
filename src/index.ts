import { createCanvasAndContext } from "./canvas";
import { update } from "./update";
import { draw } from "./draw";
import { CellGrid } from "./CellGrid";
import { Game } from "./Game";
import { setupEventHandlers } from "./setupEventHandlers";

const { cvs, ctx } = createCanvasAndContext();

const game: Game =
{
    cells: new CellGrid(80, [
        { x: 50, y: 50 },
        { x: 51, y: 50 },
        { x: 52, y: 50 },
        { x: 51, y: 48 },
        { x: 52, y: 49 },

    ]),
    mode: 'Play',
    mousePosition: { x: 0, y: 0 }
};

setupEventHandlers(game, cvs);

let last = performance.now();

const loop = (now: number) => {
    const delta = now - last;
    last = now;

    update(game, delta, ctx);

    draw(ctx, game, delta);

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
