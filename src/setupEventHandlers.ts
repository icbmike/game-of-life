import { Game } from "./Game";

export function setupEventHandlers(game: Game, cvs: HTMLCanvasElement) {

    cvs.onmousemove = (e) => {
        const rect = cvs.getBoundingClientRect();

        game.mousePosition.x = e.clientX - rect.left;
        game.mousePosition.y = e.clientY - rect.top;
    };

    cvs.onclick = (e) => {
        const rect = cvs.getBoundingClientRect();

        game.clickEvent = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

export function clearEvents(game: Game) {
    game.clickEvent = undefined;
}