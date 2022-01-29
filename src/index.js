import Game from './Game';

const game = new Game();

// keydown event listener
window.addEventListener('keydown', (event) => {
    game.handleKeyPress(event.key);
});

document.getElementById('restart').addEventListener('click', () => {
    game.restart();
});

console.log(game);

