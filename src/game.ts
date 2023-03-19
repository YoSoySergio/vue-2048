import type { Board, MoveDirection } from '@/types';

export function createEmptyBoard(size = 4): Board {
	return new Array(size).fill(null).map(() => new Array(size).fill(0));
}

export function spawnNewTile(board: Board): Board {
	const emptyCells: { row: number; col: number }[] = [];

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			if (board[row][col] === 0) {
				emptyCells.push({ row, col });
			}
		}
	}

	if (emptyCells.length) {
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		const { row, col } = emptyCells[randomIndex];
		const newBoard = JSON.parse(JSON.stringify(board));
		newBoard[row][col] = 2;
		return newBoard;
	}
	return board;
}

export function move(board: Board, direction: MoveDirection): [Board, number] {
	const transposed = direction === 'up' || direction === 'down';
	const reversed = direction === 'right' || direction === 'down';

	let totalScore = 0;
	const newBoard = (transposed ? transpose(board) : board).map((row) => {
		const [collapsedRow, rowScore] = collapseRow(row, reversed);
		totalScore += rowScore;
		return collapsedRow;
	});

	return [transposed ? transpose(newBoard) : newBoard, totalScore];
}

function transpose(board: Board): Board {
	return board[0].map((_, col) => board.map((row) => row[col]));
}

function collapseRow(row: number[], reverse: boolean): [number[], number] {
	const newRow = row.filter((value) => value !== 0);
	if (reverse) newRow.reverse();
	let rowScore = 0;

	for (let i = 0; i < newRow.length - 1; i++) {
		if (newRow[i] === newRow[i + 1]) {
			newRow[i] *= 2;
			newRow[i + 1] = 0;
			rowScore += newRow[i];
		}
	}

	const collapsedRow = newRow.filter((value) => value !== 0);
	while (collapsedRow.length < row.length) {
		if (reverse) {
			collapsedRow.unshift(0);
		} else {
			collapsedRow.push(0);
		}
	}

	return [collapsedRow, rowScore];
}

export function isGameOver(board: Board): boolean {
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			if (board[row][col] === 0) {
				return false;
			}
		}
	}
	return true;
}
