import { createCanvasAndContext } from "./canvas";
import { update } from "./update";
import { draw } from "./draw";
import { Game } from "./Game";

const { cvs, ctx } = createCanvasAndContext();

document.body.appendChild(cvs);

const game = new Game(100, [
    { x: 50, y: 50 },
    { x: 49, y: 49 },
    { x: 51, y: 51 },

]);

let last = performance.now();

const loop = (now: number) => {
    const delta = now - last;

    update(game, delta, ctx);

    draw(ctx, game, delta);

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);