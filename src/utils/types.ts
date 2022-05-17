export type Cell = "X" | "O" | null;
export type Winner = "HUMAN" | "BOT" | "DRAW";
export type BoardState = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Moves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardResult = {
    winner: Cell;
    // for cross line
    direction?: "V" | "H" | "D";
    column?: 1 | 2 | 3;
    row?: 1 | 2 | 3;
    diagonal?: "MAIN" | "COUNTER";
};
