/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _Tetromino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tetromino */ \"./src/Tetromino.js\");\n\r\n\r\nclass Board {\r\n    constructor() {\r\n        this.playArea = Array(240); //240 is the number of cells in the play area, it represents a 12 x 20 grid\r\n        this.currentTetromino;\r\n        this.cellSize = 20;\r\n        this.linesCleared = 0;\r\n        this.isClearing = false;\r\n        this.element = document.getElementById('board').getContext('2d');\r\n        document.getElementById('board').width = 12 * this.cellSize;\r\n        document.getElementById('board').height = 20 * this.cellSize;\r\n\r\n        // Fill the play area with empty cells\r\n        for (let i = 0; i < this.playArea.length; i++) {\r\n            // Sides of the play area are filled with walls\r\n            if (i == 0 || i % 12 == 0 || i % 12 == 11 || i > 228) {\r\n                this.playArea[i] = new Field(true, false);\r\n            } else {\r\n                this.playArea[i] = new Field(false, false);\r\n            }\r\n        }\r\n    }\r\n\r\n    // Set tetromino on the board\r\n    setTetromino(tetromino) {\r\n        this.currentTetromino = tetromino;\r\n        for (let i = 0; i < this.currentTetromino.shape.length; i++) {\r\n            if (this.currentTetromino.shape[i] == 1) {\r\n                let y = this.currentTetromino.y + Math.floor(i / 4);\r\n                let x = this.currentTetromino.x + i % 4;\r\n                this.playArea[y * 12 + x].hasTetromino = true;\r\n                this.playArea[y * 12 + x].color = this.currentTetromino.color;\r\n            }\r\n        }\r\n    }\r\n\r\n    clearCurrentTetromino() {\r\n        for (let i = 0; i < this.currentTetromino.shape.length; i++) {\r\n            if (this.currentTetromino.shape[i] == 1) {\r\n                let y = this.currentTetromino.y + Math.floor(i / 4);\r\n                let x = this.currentTetromino.x + i % 4;\r\n                this.playArea[y * 12 + x].hasTetromino = false;\r\n                this.playArea[y * 12 + x].color = '#fff';\r\n            }\r\n        }\r\n    }\r\n\r\n    moveDown() {\r\n        if (this.canMove(this.currentTetromino, this.currentTetromino.x, this.currentTetromino.y + 1)) {\r\n            this.clearCurrentTetromino();\r\n            this.currentTetromino.y++;\r\n\r\n            this.setTetromino(this.currentTetromino);\r\n        } else if (this.currentTetromino.y > 0) {\r\n            this.lockTetromino();\r\n\r\n            return false;\r\n        } else {\r\n            return false;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    moveLeft() {\r\n        if (this.canMove(this.currentTetromino, this.currentTetromino.x - 1, this.currentTetromino.y)) {\r\n            this.clearCurrentTetromino();\r\n            this.currentTetromino.x--;\r\n\r\n            this.setTetromino(this.currentTetromino);\r\n        }\r\n    }\r\n\r\n    moveRight() {\r\n        if (this.canMove(this.currentTetromino, this.currentTetromino.x + 1, this.currentTetromino.y)) {\r\n            this.clearCurrentTetromino();\r\n            this.currentTetromino.x++;\r\n\r\n            this.setTetromino(this.currentTetromino);\r\n        }\r\n    }\r\n\r\n    rotate() {\r\n        let testTetromino = new _Tetromino__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n            this.currentTetromino.x,\r\n            this.currentTetromino.y,\r\n            this.currentTetromino.shape,\r\n            this.currentTetromino.type\r\n        );\r\n        testTetromino.rotate();\r\n        if (this.canMove(testTetromino, testTetromino.x, testTetromino.y)) {\r\n            this.clearCurrentTetromino();\r\n            this.currentTetromino.rotate();\r\n\r\n            this.setTetromino(this.currentTetromino);\r\n        }\r\n    }\r\n\r\n    // Check if the tetromino can move to the given position\r\n    canMove(tetromino, x, y) {\r\n        for (let i = 0; i < tetromino.shape.length; i++) {\r\n            if (tetromino.shape[i] == 1) {\r\n                let boardY = y + Math.floor(i / 4);\r\n                let boardX = x + i % 4;\r\n                if (this.playArea[boardY * 12 + boardX].isLocked || this.playArea[boardY * 12 + boardX].isWall) {\r\n                    return false;\r\n                }\r\n            }\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    lockTetromino() {\r\n        for (let i = 0; i < this.currentTetromino.shape.length; i++) {\r\n            if (this.currentTetromino.shape[i] == 1) {\r\n                let y = this.currentTetromino.y + Math.floor(i / 4);\r\n                let x = this.currentTetromino.x + i % 4;\r\n                this.playArea[y * 12 + x].hasTetromino = true;\r\n                this.playArea[y * 12 + x].color = this.currentTetromino.color;\r\n                this.playArea[y * 12 + x].isLocked = true;\r\n            }\r\n        }\r\n\r\n        this.clearLines();\r\n\r\n        this.currentTetromino = null;\r\n    }\r\n\r\n    clearLines() {\r\n        for (let i = 0; i < this.playArea.length; i++) {\r\n            if (i % 12 == 0) {\r\n                let line = true;\r\n                // Check if the line is full of tetrominos\r\n                for (let j = 1; j < 11; j++) {\r\n                    if (!this.playArea[i + j].isLocked) {\r\n                        line = false;\r\n                        break;\r\n                    }\r\n                }\r\n                if (line) {\r\n                    this.linesCleared++;\r\n                    this.isClearing = true;\r\n                    for (let j = 1; j < 12; j++) {\r\n                        this.playArea[i + j].isLocked = false;\r\n                        this.playArea[i + j].hasTetromino = false;\r\n                    }\r\n\r\n                    // Move all the lines above down\r\n                    for (let j = i; j > 0; j--) {\r\n                        for (let k = 0; k < 12; k++) {\r\n                            if (!this.playArea[j + k].isWall && j > 12) {\r\n                                this.playArea[j + k].isLocked = this.playArea[j - 12 + k].isLocked;\r\n                                this.playArea[j + k].hasTetromino = this.playArea[j - 12 + k].hasTetromino;\r\n                                this.playArea[j + k].color = this.playArea[j - 12 + k].color;\r\n                            }\r\n                        }\r\n                    }                 \r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    // Render the board\r\n    render() {\r\n        // Clear the board\r\n        this.element.clearRect(0, 0, this.element.canvas.width, this.element.canvas.height);\r\n        \r\n        // Render the board;\r\n        for (let i = 0; i < this.playArea.length; i++) {\r\n            if (this.playArea[i].isWall) {\r\n                this.element.fillStyle = '#aaa';\r\n                this.element.fillRect(\r\n                    (i % 12) * this.cellSize,\r\n                    Math.floor(i / 12) * this.cellSize,\r\n                    this.cellSize,\r\n                    this.cellSize\r\n                );\r\n            } else if(this.playArea[i].hasTetromino) {\r\n                this.element.fillStyle = this.playArea[i].color;\r\n                this.element.fillRect(\r\n                    (i % 12) * this.cellSize,\r\n                    Math.floor(i / 12) * this.cellSize,\r\n                    this.cellSize,\r\n                    this.cellSize\r\n                );\r\n            } else {\r\n                this.element.strokeStyle = '#ddd';\r\n                this.element.strokeRect(\r\n                    (i % 12) * this.cellSize,\r\n                    Math.floor(i / 12) * this.cellSize,\r\n                    this.cellSize,\r\n                    this.cellSize\r\n                );\r\n            }\r\n        }\r\n    }\r\n\r\n    renderGameOver() {\r\n        this.element.fillStyle = '#ddd';\r\n        this.element.fillRect(0, 0, this.element.canvas.width, this.element.canvas.height);\r\n        this.element.fillStyle = '#f00';\r\n        this.element.font = 'bold 30px sans-serif';\r\n        this.element.fillText('GAME OVER', this.element.canvas.width / 2 - 100, this.element.canvas.height / 2);\r\n    }\r\n\r\n    renderVictory() {\r\n        this.element.fillStyle = '#ddd';\r\n        this.element.fillRect(0, 0, this.element.canvas.width, this.element.canvas.height);\r\n        this.element.fillStyle = '#0f0';\r\n        this.element.font = 'bold 30px sans-serif';\r\n        this.element.fillText('VICTORY', this.element.canvas.width / 2 - 100, this.element.canvas.height / 2);\r\n    }\r\n}\r\n\r\nclass Field {\r\n    constructor(isWall, hasTetromino) {\r\n        this.isWall = isWall;\r\n        this.hasTetromino = hasTetromino;\r\n        this.isLocked = false;\r\n        this.color = '#fff';\r\n    }\r\n}\n\n//# sourceURL=webpack://tetrisjs/./src/Board.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.js\");\n/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Preview */ \"./src/Preview.js\");\n/* harmony import */ var _Tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tetromino */ \"./src/Tetromino.js\");\n\r\n\r\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this.gameOver;\r\n        this.score;\r\n        this.level;\r\n        this.maxLevel;\r\n        this.board;\r\n        this.preview;\r\n        this.curentTetromino;\r\n        this.lineClears;\r\n\r\n        this.keyState = {\r\n            ArrowLeft: false,\r\n            ArrowRight: false,\r\n            ArrowDown: false,\r\n            ArrowUp: false\r\n        };\r\n\r\n        this.ticks;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.preview = new _Preview__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.preview.tetromino = new _Tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n        this.getNewCurrentTetromino();\r\n        this.ticks = 0;\r\n        this.score = 0;\r\n        this.level = 0;\r\n        this.maxLevel = 50;\r\n        this.lineClears = 0;\r\n        this.gameOver = false;\r\n        this.updateScore();\r\n        this.updateLevel();\r\n\r\n        // Start loop.\r\n        window.requestAnimationFrame(this.gameLoop.bind(this, document))\r\n    }\r\n\r\n    /**\r\n     * Get a new tetromino from the buffer\r\n     */\r\n    getNewCurrentTetromino() {\r\n        this.board.setTetromino(this.preview.tetromino);\r\n        this.preview.tetromino = new _Tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n    }\r\n\r\n    gameLoop(timestamp) {\r\n        this.ticks++;\r\n\r\n        if (this.board.isClearing) {\r\n            this.lineClears += this.board.linesCleared;\r\n            this.board.linesCleared = 0;\r\n            this.board.isClearing = false;\r\n            this.score += this.lineClears * (this.level + 1) * 100;\r\n            this.updateScore();\r\n\r\n            if (this.lineClears > 5) {\r\n                this.lineClears = 0;\r\n                this.level++;\r\n                this.updateLevel();\r\n\r\n                if (this.level > this.maxLevel) {\r\n                    this.renderVictory();\r\n                    window.cancelAnimationFrame(timestamp);\r\n\r\n                    return;\r\n                }\r\n            }\r\n        }\r\n        \r\n        // Handle controls.\r\n        if (this.keyState.ArrowLeft) {\r\n            this.board.moveLeft();\r\n        } else if (this.keyState.ArrowRight) {\r\n            this.board.moveRight();\r\n        } else if (this.keyState.ArrowDown) {\r\n            // Drop the tetromino.\r\n            while(this.board.moveDown());\r\n            this.getNewCurrentTetromino();\r\n        } else if (this.keyState.ArrowUp) {\r\n            this.board.rotate();\r\n        }\r\n        this.clearKeyState();\r\n\r\n        if (this.ticks % this.maxLevel - this.level == 0) {\r\n            if (!this.board.moveDown()) {\r\n                if (this.board.currentTetromino && this.board.currentTetromino.y < 1) {\r\n                    this.gameOver = true;\r\n                    this.renderGameOver();\r\n                    window.cancelAnimationFrame(timestamp);\r\n\r\n                    return;\r\n                }\r\n\r\n                this.getNewCurrentTetromino();\r\n            }\r\n        }\r\n\r\n        this.render();\r\n\r\n        window.requestAnimationFrame(\r\n            this.gameLoop.bind(this, document)\r\n        );\r\n    }\r\n\r\n    handleKeyPress(key) {\r\n        this.keyState[key] = true;\r\n    }\r\n\r\n    clearKeyState() {\r\n        for (let key in this.keyState) {\r\n            this.keyState[key] = false;\r\n        }\r\n    }\r\n\r\n    render() {\r\n        this.board.render();\r\n        this.preview.render();\r\n    }\r\n\r\n    renderGameOver() {\r\n        this.board.renderGameOver();\r\n        document.getElementById('restart').style.display = 'block';\r\n    }\r\n\r\n    renderVictory() {\r\n        this.board.renderVictory();\r\n    }\r\n\r\n    updateScore() {\r\n        document.getElementById('score').innerHTML = this.score;\r\n    };\r\n\r\n    updateLevel() {\r\n        document.getElementById('level').innerHTML = this.level;\r\n    }\r\n\r\n    restart() {\r\n        document.getElementById('restart').style.display = 'none';\r\n        this.init();\r\n    }\r\n}\n\n//# sourceURL=webpack://tetrisjs/./src/Game.js?");

/***/ }),

/***/ "./src/Preview.js":
/*!************************!*\
  !*** ./src/Preview.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Preview)\n/* harmony export */ });\nclass Preview {\r\n    constructor() {\r\n        this.tetromino;\r\n        this.cellSize = 20;\r\n        this.element = document.getElementById('next').getContext('2d');\r\n        document.getElementById('next').width = 4 * this.cellSize;\r\n        document.getElementById('next').height = 4 * this.cellSize;\r\n    }\r\n\r\n    render() {\r\n        this.element.clearRect(0, 0, 4 * this.cellSize, 4 * this.cellSize);\r\n        this.element.fillStyle = '#fff';\r\n        this.element.fillRect(0, 0, 4 * this.cellSize, 4 * this.cellSize);\r\n        this.element.fillStyle = this.tetromino.color;\r\n        for (let i = 0; i < this.tetromino.shape.length; i++) {\r\n            let y = Math.floor(i / 4);\r\n            let x = i % 4;\r\n            if (this.tetromino.shape[i] == 1) {\r\n                this.element.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);\r\n            } else {\r\n                this.element.strokeStyle = '#ddd';\r\n                this.element.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://tetrisjs/./src/Preview.js?");

/***/ }),

/***/ "./src/Shapes.js":
/*!***********************!*\
  !*** ./src/Shapes.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst shapes = {\r\n    'i': [\r\n        0, 0, 1, 0,\r\n        0, 0, 1, 0,\r\n        0, 0, 1, 0,\r\n        0, 0, 1, 0\r\n    ],\r\n    'j': [\r\n        0, 0, 1, 0,\r\n        0, 0, 1, 0,\r\n        0, 1, 1, 0,\r\n        0, 0, 0, 0\r\n    ],\r\n    'l': [\r\n        0, 1, 0, 0,\r\n        0, 1, 0, 0,\r\n        0, 1, 1, 0,\r\n        0, 0, 0, 0\r\n    ],\r\n    'o': [\r\n        0, 1, 1, 0,\r\n        0, 1, 1, 0,\r\n        0, 0, 0, 0,\r\n        0, 0, 0, 0\r\n    ],\r\n    's': [\r\n        0, 0, 1, 1,\r\n        0, 1, 1, 0,\r\n        0, 0, 0, 0,\r\n        0, 0, 0, 0\r\n    ],\r\n    't': [\r\n        0, 0, 1, 0,\r\n        0, 1, 1, 0,\r\n        0, 0, 1, 0,\r\n        0, 0, 0, 0\r\n    ],\r\n    'z': [\r\n        0, 1, 1, 0,\r\n        0, 0, 1, 1,\r\n        0, 0, 0, 0,\r\n        0, 0, 0, 0\r\n    ]\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shapes);\n\n//# sourceURL=webpack://tetrisjs/./src/Shapes.js?");

/***/ }),

/***/ "./src/Tetromino.js":
/*!**************************!*\
  !*** ./src/Tetromino.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tetromino)\n/* harmony export */ });\n/* harmony import */ var _Shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shapes */ \"./src/Shapes.js\");\n\r\nconst types = ['i', 'j', 'l', 'o', 's', 't', 'z'];\r\nconst colors = {\r\n    'i': '#00ffff',\r\n    'j': '#0000ff',\r\n    'l': '#ff0000',\r\n    'o': '#ffff00',\r\n    's': '#00ff00',\r\n    't': '#ff00ff',\r\n    'z': '#ff00ff'\r\n};\r\n\r\nclass Tetromino {\r\n    \r\n    // constructor() {\r\n    //     this.type = types[Math.floor(Math.random() * 7)];\r\n    //     this.shape = shapes[this.type];\r\n    //     this.color = colors[this.type];\r\n    //     this.x = 4;\r\n    //     this.y = 0;\r\n    // }\r\n\r\n    constructor(x = 4, y = 0, shape=[], type='') {\r\n        if (!type) {\r\n            this.type = types[Math.floor(Math.random() * 7)];\r\n            this.shape = _Shapes__WEBPACK_IMPORTED_MODULE_0__[\"default\"][this.type];\r\n        } else {\r\n            this.type = type;\r\n            this.shape = shape;\r\n        }\r\n        this.color = colors[this.type];\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n\r\n    // Rotate the tetromino array by 90 degrees\r\n    rotate() {\r\n        let newShape = Array(16).fill(0);\r\n        for (let i = 0; i < this.shape.length; i++) {\r\n            let x = i % 4;\r\n            let y = Math.floor(i / 4);\r\n            let index = 12 + y - (x * 4);\r\n            newShape[index] = this.shape[i];\r\n        }\r\n            this.shape = newShape;\r\n    }\r\n}\n\n//# sourceURL=webpack://tetrisjs/./src/Tetromino.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n\r\n\r\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n// keydown event listener\r\nwindow.addEventListener('keydown', (event) => {\r\n    game.handleKeyPress(event.key);\r\n});\r\n\r\ndocument.getElementById('restart').addEventListener('click', () => {\r\n    game.restart();\r\n});\r\n\r\nconsole.log(game);\r\n\r\n\n\n//# sourceURL=webpack://tetrisjs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;