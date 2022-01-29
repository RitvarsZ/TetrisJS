import Tetromino from "./Tetromino";

export default class Board {
    constructor() {
        this.playArea = Array(240); //240 is the number of cells in the play area, it represents a 12 x 20 grid
        this.currentTetromino;
        this.cellSize = 20;
        this.linesCleared = 0;
        this.isClearing = false;
        this.element = document.getElementById('board').getContext('2d');
        document.getElementById('board').width = 12 * this.cellSize;
        document.getElementById('board').height = 20 * this.cellSize;

        // Fill the play area with empty cells
        for (let i = 0; i < this.playArea.length; i++) {
            // Sides of the play area are filled with walls
            if (i == 0 || i % 12 == 0 || i % 12 == 11 || i > 228) {
                this.playArea[i] = new Field(true, false);
            } else {
                this.playArea[i] = new Field(false, false);
            }
        }
    }

    // Set tetromino on the board
    setTetromino(tetromino) {
        this.currentTetromino = tetromino;
        for (let i = 0; i < this.currentTetromino.shape.length; i++) {
            if (this.currentTetromino.shape[i] == 1) {
                let y = this.currentTetromino.y + Math.floor(i / 4);
                let x = this.currentTetromino.x + i % 4;
                this.playArea[y * 12 + x].hasTetromino = true;
                this.playArea[y * 12 + x].color = this.currentTetromino.color;
            }
        }
    }

    clearCurrentTetromino() {
        for (let i = 0; i < this.currentTetromino.shape.length; i++) {
            if (this.currentTetromino.shape[i] == 1) {
                let y = this.currentTetromino.y + Math.floor(i / 4);
                let x = this.currentTetromino.x + i % 4;
                this.playArea[y * 12 + x].hasTetromino = false;
                this.playArea[y * 12 + x].color = '#fff';
            }
        }
    }

    moveDown() {
        if (this.canMove(this.currentTetromino, this.currentTetromino.x, this.currentTetromino.y + 1)) {
            this.clearCurrentTetromino();
            this.currentTetromino.y++;

            this.setTetromino(this.currentTetromino);
        } else if (this.currentTetromino.y > 0) {
            this.lockTetromino();

            return false;
        } else {
            return false;
        }

        return true;
    }

    moveLeft() {
        if (this.canMove(this.currentTetromino, this.currentTetromino.x - 1, this.currentTetromino.y)) {
            this.clearCurrentTetromino();
            this.currentTetromino.x--;

            this.setTetromino(this.currentTetromino);
        }
    }

    moveRight() {
        if (this.canMove(this.currentTetromino, this.currentTetromino.x + 1, this.currentTetromino.y)) {
            this.clearCurrentTetromino();
            this.currentTetromino.x++;

            this.setTetromino(this.currentTetromino);
        }
    }

    rotate() {
        let testTetromino = new Tetromino(
            this.currentTetromino.x,
            this.currentTetromino.y,
            this.currentTetromino.shape,
            this.currentTetromino.type
        );
        testTetromino.rotate();
        if (this.canMove(testTetromino, testTetromino.x, testTetromino.y)) {
            this.clearCurrentTetromino();
            this.currentTetromino.rotate();

            this.setTetromino(this.currentTetromino);
        }
    }

    // Check if the tetromino can move to the given position
    canMove(tetromino, x, y) {
        for (let i = 0; i < tetromino.shape.length; i++) {
            if (tetromino.shape[i] == 1) {
                let boardY = y + Math.floor(i / 4);
                let boardX = x + i % 4;
                if (this.playArea[boardY * 12 + boardX].isLocked || this.playArea[boardY * 12 + boardX].isWall) {
                    return false;
                }
            }
        }

        return true;
    }

    lockTetromino() {
        for (let i = 0; i < this.currentTetromino.shape.length; i++) {
            if (this.currentTetromino.shape[i] == 1) {
                let y = this.currentTetromino.y + Math.floor(i / 4);
                let x = this.currentTetromino.x + i % 4;
                this.playArea[y * 12 + x].hasTetromino = true;
                this.playArea[y * 12 + x].color = this.currentTetromino.color;
                this.playArea[y * 12 + x].isLocked = true;
            }
        }

        this.clearLines();

        this.currentTetromino = null;
    }

    clearLines() {
        for (let i = 0; i < this.playArea.length; i++) {
            if (i % 12 == 0) {
                let line = true;
                // Check if the line is full of tetrominos
                for (let j = 1; j < 11; j++) {
                    if (!this.playArea[i + j].isLocked) {
                        line = false;
                        break;
                    }
                }
                if (line) {
                    this.linesCleared++;
                    this.isClearing = true;
                    for (let j = 1; j < 12; j++) {
                        this.playArea[i + j].isLocked = false;
                        this.playArea[i + j].hasTetromino = false;
                    }

                    // Move all the lines above down
                    for (let j = i; j > 0; j--) {
                        for (let k = 0; k < 12; k++) {
                            if (!this.playArea[j + k].isWall && j > 12) {
                                this.playArea[j + k].isLocked = this.playArea[j - 12 + k].isLocked;
                                this.playArea[j + k].hasTetromino = this.playArea[j - 12 + k].hasTetromino;
                                this.playArea[j + k].color = this.playArea[j - 12 + k].color;
                            }
                        }
                    }                 
                }
            }
        }
    }

    // Render the board
    render() {
        // Clear the board
        this.element.clearRect(0, 0, this.element.canvas.width, this.element.canvas.height);
        
        // Render the board;
        for (let i = 0; i < this.playArea.length; i++) {
            if (this.playArea[i].isWall) {
                this.element.fillStyle = '#aaa';
                this.element.fillRect(
                    (i % 12) * this.cellSize,
                    Math.floor(i / 12) * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            } else if(this.playArea[i].hasTetromino) {
                this.element.fillStyle = this.playArea[i].color;
                this.element.fillRect(
                    (i % 12) * this.cellSize,
                    Math.floor(i / 12) * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            } else {
                this.element.strokeStyle = '#ddd';
                this.element.strokeRect(
                    (i % 12) * this.cellSize,
                    Math.floor(i / 12) * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }

    renderGameOver() {
        this.element.fillStyle = '#ddd';
        this.element.fillRect(0, 0, this.element.canvas.width, this.element.canvas.height);
        this.element.fillStyle = '#f00';
        this.element.font = 'bold 30px sans-serif';
        this.element.fillText('GAME OVER', this.element.canvas.width / 2 - 100, this.element.canvas.height / 2);
    }

    renderVictory() {
        this.element.fillStyle = '#ddd';
        this.element.fillRect(0, 0, this.element.canvas.width, this.element.canvas.height);
        this.element.fillStyle = '#0f0';
        this.element.font = 'bold 30px sans-serif';
        this.element.fillText('VICTORY', this.element.canvas.width / 2 - 100, this.element.canvas.height / 2);
    }
}

class Field {
    constructor(isWall, hasTetromino) {
        this.isWall = isWall;
        this.hasTetromino = hasTetromino;
        this.isLocked = false;
        this.color = '#fff';
    }
}