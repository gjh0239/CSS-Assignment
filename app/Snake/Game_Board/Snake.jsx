// Jun Hang

import React, { useState, useEffect } from 'react';
import { randomIntFromInterval, useInterval } from './utils'; // we import our utility functions (sourced from the internet)
import './Snake.css';

// THE LOGIC FOR THIS CODE IS EXPLAINED IN README.MD

// STARTING VARIABLES
const BOARD_SIZE = 15;	// BOARD_SIZE ^ 2 for no. of cells
const TICK_RATE = 200;	// in ms

// Board logic

// We create our SinglyLinkedList and LinkedListNode as stated under (Board Logic --> Snake)
class LinkedListNode {	// Our node
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class SinglyLinkedList { // The singly linked list to actually store our snake's nodes
	constructor(value) {
		const node = new LinkedListNode(value);
		this.head = node;
		this.tail = node;
	}
}

// we get the starting snake cell
const getInitialSnakePos = board => {

	// Easy way to position the snake dynamically based on the board size
	// Since the board is square, I simply used BOARD_SIZE to do the calculations.
	const startingRow = Math.round(BOARD_SIZE / 3);
	const startingCol = Math.round(BOARD_SIZE / 3);
	const startingCell = board[startingRow][startingCol];
	return {
		row: startingRow,
		col: startingCol,
		cell: startingCell,
	};
};

// we create the board (grid) itself --> returns a 2D array (row, column)
const createBoard = boardSize => {
	const board = [];
	for (let rowNumber = 0; rowNumber < boardSize; rowNumber++) {
		const currentRow = [];
		for (let columnNumber = 0; columnNumber < boardSize; columnNumber++) {
			currentRow.push(rowNumber * boardSize + columnNumber);	// loops through till each row is filled with cells
		}
		board.push(currentRow);	// loops through to fill the board with rows
	}
	return board;
};

// runs checks to determine if the next coords is out of bounds
const isOutOfBounds = (coords, board) => {
	const { row, col } = coords;
	if (row < 0 || col < 0) return true;	// handles the case where the snakes goes too far left or up (neg x or y axis)
	if (row >= board.length || col >= board[0].length) return true;	// handles the alternative of too far right or down (pos x or y axis)
	return false;
};

// logic to make the snake body cells follow the cell in front of them -- could've simply use accosiative array
// but i couldn't get it to work so here we are with this mess of a code

const getNextNodeDirection = (node, currentDirection) => {
	if (node.next === null) return currentDirection;
	const { row: currentRow, col: currentCol } = node.value;
	const { row: nextRow, col: nextCol } = node.next.value;
	if (nextRow === currentRow && nextCol === currentCol + 1) {
		return 'RIGHT';
	}
	if (nextRow === currentRow && nextCol === currentCol - 1) {
		return 'LEFT';
	}
	if (nextCol === currentCol && nextRow === currentRow + 1) {
		return 'DOWN';
	}
	if (nextCol === currentCol && nextRow === currentRow - 1) {
		return 'UP';
	}
	return '';
};

// This resolves the direction into actual changes in coordinates to be used in moveSnake()
const moveCoordsWithDirection = (coordinates, direction) => {
	// switch instead of if else for ELEGANCE
	switch (direction) {
		case 'UP':
			return { row: coordinates.row - 1, col: coordinates.col };
		case 'RIGHT':
			return { row: coordinates.row, col: coordinates.col + 1 };
		case 'DOWN':
			return { row: coordinates.row + 1, col: coordinates.col };
		case 'LEFT':
			return { row: coordinates.row, col: coordinates.col - 1 };
		default:
			return coordinates; // really shouldn't happen, but it's here to catch edge cses
		// false DIRECTION should have already been resolved in handleKeyDown
	}
};

// simply returns the opposite direction --> used in getGrowthNodeCoords
const getOppositeDirection = direction => {
	if (direction === 'UP') return 'DOWN';
	if (direction === 'RIGHT') return 'LEFT';
	if (direction === 'DOWN') return 'UP';
	if (direction === 'LEFT') return 'RIGHT';
};

// gives us the next cell coords based on the current direction (for snake body)
const getGrowthNodeCoords = (snakeTail, currentDirection) => {
	const tailNextNodeDirection = getNextNodeDirection(
		snakeTail,
		currentDirection,
	);
	// workaround to fix a tail growth bug
	const growthDirection = getOppositeDirection(tailNextNodeDirection);
	const currentTailCoords = {
		row: snakeTail.value.row,
		col: snakeTail.value.col,
	};
	const growthNodeCoords = moveCoordsWithDirection(
		currentTailCoords,
		growthDirection,
	);
	return growthNodeCoords;
};

// The part that is used in the return <html> part of the Board component
const getCellClassName = (
	cellValue,
	foodCell,
	snakeCells,
) => {
	let className = 'cell';
	if (cellValue === foodCell) {
		className = 'cell cell-red';
	}
	if (snakeCells.has(cellValue)) className = 'cell cell-green';

	return className;
};

// Next we create our board component
const Board = () => {	// es6 cool but normal functions are cooler :)

	// We set our state variables
	const [score, setScore] = useState(0);	// this stores the current player score
	const [board] = useState(createBoard(BOARD_SIZE));	// this stores the board itself
	const [snake, setSnake] = useState(
		new SinglyLinkedList(getInitialSnakePos(board)),	// the linkedList is the snake itself
	);
	const [snakeCells, setSnakeCells] = useState(
		new Set([snake.head.value.cell]), // this stores the cells the snake is currently on 
		// (to check for collision for fruit AND for snake head)
	);

	// sets the FIRST food cell 5 tiles away from the initial snake head
	const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);

	// stores the direction that the snake moves -- should be the first to update in the game loop
	const [direction, setDirection] = useState('RIGHT');

	// simple way to store the highest score using localStorage (as taught in class)
	// i used || 0 so it displays 0 if there's no highscore
	const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0); 

	
	
	// the useEffect hook is used to listen for key presses
	// SATISFIES FUNCTION 1 OF THE GAME TICK
	useEffect(() => { window.addEventListener('keydown', event => { handleKeydown(event); }); },
		[]
	);



	// the useInterval hook is used to move the snake every TICK_RATE ms
	useInterval(() => { moveSnake(); }, TICK_RATE);	// the workaround for setInterval

	// a hybrid function to handle BOTH score increments (when the snake eats the food) and food generation
	function foodConsumptionGeneration(newSnakeCells) {

		// foodGeneration part

		// First, determine maximum coordinates to feed into RNG
		const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
		let nextFoodCell;
		// After doing some calculations, it appears that it isn't actually particularly inefficient,
		// since at it's worse, it's O(n) where n is the number of cells on the board. (well it's a 15x15
		// board so it's not actually that bad. I'm sure i could make it more efficent but hey if it works
		// don't fix it)
		while (true) {
			nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue); // attempts to create a new food cell (coords)
			// denys attempt IF the new cell is already occupied by the snake or the current food
			if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell) 
				continue;
			break; // else we accept the attempt and exit the loop
		}


		// foodConsumption part

		setFoodCell(nextFoodCell); // sets the new food cell assuming it has been accepted
		setScore(score + 1);
	}

	// handles user input (will be fed to snake movement later)
	const handleKeydown = event =>
	{
		// handles the key press processing
		const getDirectionFromKey = key => {
			if (key === 'ArrowUp' || key === 'w') return 'UP';
			if (key === 'ArrowRight' || key === 'd') return 'RIGHT';
			if (key === 'ArrowDown' || key === 's') return 'DOWN';
			if (key === 'ArrowLeft' || key === 'a') return 'LEFT';
			return '';	// handles invalid keypresses
		};

		// logic
		const newDirection = getDirectionFromKey(event.key); // gets the new direction from the key pressed
		if (newDirection === '') return; // ignore invalid keys (as stated by getDirectionFromKey)

		setDirection(newDirection);
	}

	// will be run if any collision check returns true
	function handleGameOver()
	{
		// checks if current score > highscore, sets highscore as current score if true
		if (score > highScore) {
			setHighScore(score);
			localStorage.setItem('highScore', score);
		}
		setScore(0);

		// resets the game
		const startingSnakeLinkedList = getInitialSnakePos(board);
		setSnake(new SinglyLinkedList(startingSnakeLinkedList));	// reinitialises the snake linkedlist
		setFoodCell(startingSnakeLinkedList.cell + 5);
		setSnakeCells(new Set([startingSnakeLinkedList.cell]));	// reinitialises the snake cells (just like wayyy above)
		setDirection('RIGHT');	// apparently snake game starts with the snake moving right so yeah
	}
	
	// grows the tail
	function growSnake(newSnakeCells) {
		const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
		if (isOutOfBounds(growthNodeCoords, board)) {
			// Snake is positioned such that it can't grow; don't do anything.
			return;
		}
		const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
		const newTail = new LinkedListNode({
			row: growthNodeCoords.row,
			col: growthNodeCoords.col,
			cell: newTailCell,
		});
		const currentTail = snake.tail;
		snake.tail = newTail;
		snake.tail.next = currentTail;

		newSnakeCells.add(newTailCell);
	}

	// the main function that moves the snake
	function moveSnake() {

		const currentHeadCoords = {
			row: snake.head.value.row,
			col: snake.head.value.col,
		};

		// SATISFIES FUNCTION 2 OF THE GAME TICK
		// get the next head coords based on the current direction and checks if there is potential edge collision
		const nextHeadCoords = moveCoordsWithDirection(currentHeadCoords, direction);
		if (isOutOfBounds(nextHeadCoords, board)) {
			handleGameOver(); // ggwp
			return;
		}

		// checks if the next head cell is occupied by the snake body
		const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
		if (snakeCells.has(nextHeadCell)) {
			handleGameOver(); // ggwp
			return;
		}

		// after all checks pass, we move the snake head to the next cell
		const newHead = new LinkedListNode({
			row: nextHeadCoords.row,
			col: nextHeadCoords.col,
			cell: nextHeadCell,
		});

		const currentHead = snake.head;
		snake.head = newHead;
		currentHead.next = newHead;

		// SATISFIES FUNCTION 3 OF THE GAME TICK
		// we update the snake body and tail
		const newSnakeCells = new Set(snakeCells);
		newSnakeCells.delete(snake.tail.value.cell);
		newSnakeCells.add(nextHeadCell);

		snake.tail = snake.tail.next;
		if (snake.tail === null) snake.tail = snake.head;

		// SATISFIES FUNCTION 4 OF THE GAME TICK
		// IF SNAKE HEAD EAT FRUIT
		const foodConsumed = nextHeadCell === foodCell;
		if (foodConsumed) {
			// This function mutates newSnakeCells.
			growSnake(newSnakeCells);

			// SATISFIES FUNCTION 5 OF THE GAME TICK
			// foodConsumptionGeneration also updates the score for us
			foodConsumptionGeneration(newSnakeCells);
		}

		// SATISFIES FUNCTION 6 OF THE GAME TICK
		// we update the snake cells :))))
		setSnakeCells(newSnakeCells);
	}

	return (
		<>
			<h1>Score: {score}</h1>
			<h1>High Score: {highScore}</h1>
			<div className="board">
				{board.map((row, rowId) => (
					<div key={rowId} className="row">
						{row.map((cellValue, cellId) => {
							const className = getCellClassName(
								cellValue,
								foodCell,
								snakeCells,
							);
							return <div key={cellId} className={className}></div>;
						})}
					</div>
				))}
			</div>
		</>
	);
};

export default Board;	// exports the board component --> used in App.js