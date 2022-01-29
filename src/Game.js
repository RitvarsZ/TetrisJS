import Board from './Board';
import Preview from './Preview';
import Tetromino from './Tetromino';

export default class Game {
    constructor() {
        this.gameOver;
        this.score;
        this.level;
        this.maxLevel;
        this.board;
        this.preview;
        this.curentTetromino;
        this.lineClears;

        this.keyState = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowDown: false,
            ArrowUp: false
        };

        this.ticks;
        this.init();
    }

    init() {
        this.board = new Board();
        this.preview = new Preview();
        this.preview.tetromino = new Tetromino();
        this.getNewCurrentTetromino();
        this.ticks = 0;
        this.score = 0;
        this.level = 0;
        this.maxLevel = 50;
        this.lineClears = 0;
        this.gameOver = false;
        this.updateScore();
        this.updateLevel();

        // Start loop.
        window.requestAnimationFrame(this.gameLoop.bind(this, document))
    }

    /**
     * Get a new tetromino from the buffer
     */
    getNewCurrentTetromino() {
        this.board.setTetromino(this.preview.tetromino);
        this.preview.tetromino = new Tetromino();
    }

    gameLoop(timestamp) {
        this.ticks++;

        if (this.board.isClearing) {
            this.lineClears += this.board.linesCleared;
            this.board.linesCleared = 0;
            this.board.isClearing = false;
            this.score += this.lineClears * (this.level + 1) * 100;
            this.updateScore();

            if (this.lineClears > 5) {
                this.lineClears = 0;
                this.level++;
                this.updateLevel();

                if (this.level > this.maxLevel) {
                    this.renderVictory();
                    window.cancelAnimationFrame(timestamp);

                    return;
                }
            }
        }
        
        // Handle controls.
        if (this.keyState.ArrowLeft) {
            this.board.moveLeft();
        } else if (this.keyState.ArrowRight) {
            this.board.moveRight();
        } else if (this.keyState.ArrowDown) {
            // Drop the tetromino.
            while(this.board.moveDown());
            this.getNewCurrentTetromino();
        } else if (this.keyState.ArrowUp) {
            this.board.rotate();
        }
        this.clearKeyState();

        if (this.ticks % this.maxLevel - this.level == 0) {
            if (!this.board.moveDown()) {
                if (this.board.currentTetromino && this.board.currentTetromino.y < 1) {
                    this.gameOver = true;
                    this.renderGameOver();
                    window.cancelAnimationFrame(timestamp);

                    return;
                }

                this.getNewCurrentTetromino();
            }
        }

        this.render();

        window.requestAnimationFrame(
            this.gameLoop.bind(this, document)
        );
    }

    handleKeyPress(key) {
        this.keyState[key] = true;
    }

    clearKeyState() {
        for (let key in this.keyState) {
            this.keyState[key] = false;
        }
    }

    render() {
        this.board.render();
        this.preview.render();
    }

    renderGameOver() {
        this.board.renderGameOver();
        document.getElementById('restart').style.display = 'block';
    }

    renderVictory() {
        this.board.renderVictory();
    }

    updateScore() {
        document.getElementById('score').innerHTML = this.score;
    };

    updateLevel() {
        document.getElementById('level').innerHTML = this.level;
    }

    restart() {
        document.getElementById('restart').style.display = 'none';
        this.init();
    }
}