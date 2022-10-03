import { Game } from "./Game";

export const draw = (ctx: CanvasRenderingContext2D, game: Game, delta: number) => {
    const { mode, cells, mousePosition: { x, y }, cellScale } = game;

    const cellX = Math.floor(x / cellScale);
    const cellY = Math.floor(y / cellScale);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < cells.getSize(); i++) {

        for (let j = 0; j < cells.getSize(); j++) {
            if (cells.isAlive(i, j)) {
                ctx.fillRect(i * cellScale, j * cellScale, cellScale, cellScale);
            }
        }

        ctx.beginPath();
        ctx.strokeStyle = '#b8b8b8';
        ctx.lineWidth = 0.5;
        ctx.moveTo((i + 1) * cellScale, 0);
        ctx.lineTo((i + 1) * cellScale, ctx.canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j < cells.getSize(); j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * cellScale);
        ctx.lineTo(cells.getSize() * cellScale, j * cellScale);
        ctx.stroke();
    }

    if (mode === 'Pause') {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(cellX * cellScale, (cellY - 0.5) * cellScale);
        ctx.lineTo(cellX * cellScale, (cellY + 1.5) * cellScale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellX * cellScale + cellScale, (cellY - 0.5) * cellScale);
        ctx.lineTo(cellX * cellScale + cellScale, (cellY + 1.5) * cellScale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo((cellX - 0.5) * cellScale, cellY * cellScale);
        ctx.lineTo((cellX + 1.5) * cellScale, cellY * cellScale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo((cellX - 0.5) * cellScale, (cellY + 1) * cellScale);
        ctx.lineTo((cellX + 1.5) * cellScale, (cellY + 1) * cellScale);
        ctx.stroke();
    }

    ctx.fillStyle = 'black';
    ctx.fillText(`Canvas position x: ${x}, y: ${y}`, cells.getSize() * cellScale + cellScale, cellScale);

    ctx.fillText(`Cell position x: ${cellX}, y: ${cellY}`, cells.getSize() * cellScale + cellScale, 20);
}