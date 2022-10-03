import { Game } from "./Game";


const playPauseButton = (game: Game) => {
    const b = document.createElement("button");
    b.innerText = "Play/Pause";
    b.onclick = () => {
        game.mode = game.mode == "Pause" ? "Play" : "Pause";
    };

    return b;
}

const newGlider = (game: Game) => {
    const b = document.createElement("button");
    b.innerHTML = `<img src="glider.png" />`;

    b.onclick = () => {
        game.prototype = game.prototype != 'Glider' ? 'Glider': undefined;
    };

    return b;
}

const newGliderGun = (game: Game) => {
    const b = document.createElement("button");
    b.innerHTML = `<img src="glider_gun.png" style="height:80px;"/>`;

    b.onclick = () => {
        game.prototype = game.prototype != 'Glider Gun' ? 'Glider Gun': undefined;
    };

    return b;
}

const generationLengthSlider = (game: Game) => {
    const r = document.createElement("input");
    r.type = 'range';
    r.min = "1";
    r.max = "300";
    r.value = game.generationLength.toString()
    
    r.onchange = () => {
        game.generationLength = parseInt(r.value)
    }

    return r;
};

export const createControls = (game: Game) => {
    const container = document.createElement('div');
    container.className = 'controls';

    container.append(
        playPauseButton(game),
        newGlider(game),
        newGliderGun(game),
        generationLengthSlider(game)
    );

    return container;
}
