import { Game } from "./Game";

export function setupEventHandlers(game: Game, cvs: HTMLCanvasElement) {
    cvs.onmousemove = (e) => {
        game.mousePosition.x = e.clientX;
        game.mousePosition.y = e.clientY;
    };
}
