export default class Preview {
    constructor() {
        this.tetromino;
        this.cellSize = 20;
        this.element = document.getElementById('next').getContext('2d');
        document.getElementById('next').width = 4 * this.cellSize;
        document.getElementById('next').height = 4 * this.cellSize;
    }

    render() {
        this.element.clearRect(0, 0, 4 * this.cellSize, 4 * this.cellSize);
        this.element.fillStyle = '#fff';
        this.element.fillRect(0, 0, 4 * this.cellSize, 4 * this.cellSize);
        this.element.fillStyle = this.tetromino.color;
        for (let i = 0; i < this.tetromino.shape.length; i++) {
            let y = Math.floor(i / 4);
            let x = i % 4;
            if (this.tetromino.shape[i] == 1) {
                this.element.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            } else {
                this.element.strokeStyle = '#ddd';
                this.element.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }
}