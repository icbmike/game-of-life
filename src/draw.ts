import { IGame } from "./Game";

export const draw = (ctx: CanvasRenderingContext2D, game: IGame, delta: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < game.getSize(); i++) {

        for (let j = 0; j < game.getSize(); j++) {
            if (game.isAlive(i, j)) {
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }

        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.moveTo((i + 1) * 10, 0);
        ctx.lineTo((i + 1) * 10, ctx.canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j < game.getSize(); j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * 10);
        ctx.lineTo(ctx.canvas.width, j * 10);
        ctx.stroke();
    }
}