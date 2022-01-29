import shapes from './Shapes';
const types = ['i', 'j', 'l', 'o', 's', 't', 'z'];
const colors = {
    'i': '#00ffff',
    'j': '#0000ff',
    'l': '#ff0000',
    'o': '#ffff00',
    's': '#00ff00',
    't': '#ff00ff',
    'z': '#ff00ff'
};

export default class Tetromino {
    
    // constructor() {
    //     this.type = types[Math.floor(Math.random() * 7)];
    //     this.shape = shapes[this.type];
    //     this.color = colors[this.type];
    //     this.x = 4;
    //     this.y = 0;
    // }

    constructor(x = 4, y = 0, shape=[], type='') {
        if (!type) {
            this.type = types[Math.floor(Math.random() * 7)];
            this.shape = shapes[this.type];
        } else {
            this.type = type;
            this.shape = shape;
        }
        this.color = colors[this.type];
        this.x = x;
        this.y = y;
    }

    // Rotate the tetromino array by 90 degrees
    rotate() {
        let newShape = Array(16).fill(0);
        for (let i = 0; i < this.shape.length; i++) {
            let x = i % 4;
            let y = Math.floor(i / 4);
            let index = 12 + y - (x * 4);
            newShape[index] = this.shape[i];
        }
            this.shape = newShape;
    }
}