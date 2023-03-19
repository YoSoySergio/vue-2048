export type Board = number[][];
export type MoveDirection = 'up' | 'down' | 'left' | 'right';
export type GameState = {
	gridSize: number;
	board: Board;
	startGame: () => void;
	move: (board: Board, direction: MoveDirection) => void;
	score: number;
	gameOver: boolean;
};
