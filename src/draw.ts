import { Game } from "./Game";

export const draw = (ctx: CanvasRenderingContext2D, game: Game, delta: number) => {
    const { cells, mousePosition: { x, y } } = game;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < cells.getSize(); i++) {

        for (let j = 0; j < cells.getSize(); j++) {
            if (cells.isAlive(i, j)) {
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }

        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.moveTo((i + 1) * 10, 0);
        ctx.lineTo((i + 1) * 10, ctx.canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j < cells.getSize(); j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * 10);
        ctx.lineTo(cells.getSize() * 10, j * 10);
        ctx.stroke();
    }

    ctx.fillStyle = 'black';
    ctx.fillText(`Canvas position x: ${x}, y: ${y}`, cells.getSize() * 10 + 10, 10);
    ctx.fillText(`Cell position x: ${Math.floor(x / 10)}, y: ${Math.floor(y / 10)}`, cells.getSize() * 10 + 10, 20);

}