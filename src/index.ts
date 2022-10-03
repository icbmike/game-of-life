import { createCanvasAndContext } from "./canvas";
import { update } from "./update";
import { draw } from "./draw";
import { CellGrid } from "./CellGrid";
import { Game } from "./Game";
import { setupEventHandlers, clearEvents } from "./setupEventHandlers";
import { createControls } from "./controls";

const { cvs, ctx } = createCanvasAndContext();

const game: Game = {
  cells: new CellGrid(80, [
    { x: 70, y: 50 },
    { x: 71, y: 50 },
    { x: 72, y: 50 },
    { x: 71, y: 48 },
    { x: 72, y: 49 },
  ]),
  mode: "Pause",
  mousePosition: { x: 0, y: 0 },
  clickEvent: undefined,
  cellScale: 10,
  prototype: undefined
};

const controls = createControls(game);

document.getElementsByClassName('app')[0].appendChild(controls);

setupEventHandlers(game, cvs);

let last = performance.now();

const loop = (now: number) => {
  const delta = now - last;
  last = now;

  update(game, delta, ctx);

  draw(ctx, game, delta);

  clearEvents(game);

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
