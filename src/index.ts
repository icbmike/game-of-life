import { createCanvasAndContext } from "./canvas";
import { update } from "./update";
import { draw } from "./draw";
import { Game } from "./Game";

const { cvs, ctx } = createCanvasAndContext();

const game = new Game(80, [
    { x: 50, y: 50 },
    { x: 51, y: 50 },
    { x: 52, y: 50 },
    { x: 51, y: 48 },
    { x: 52, y: 49 },

]);

let last = performance.now();

const loop = (now: number) => {
    const delta = now - last;
    last = now;

    update(game, delta, ctx);

    draw(ctx, game, delta);

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);