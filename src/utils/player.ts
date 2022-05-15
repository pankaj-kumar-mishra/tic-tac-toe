import { getAvailableMoves, isTerminal } from "./board";
import { BoardState } from "./types";

// maximizing => true => 'X'
// maximizing => false => 'O'
export const getBestMove = (
    state: BoardState,
    maximizing: boolean,
    depth = 0,
    maxDepth = -1
): number => {
    const childValues: { [key: string]: string } = {};

    const getBestMoveRecursive = (
        state: BoardState,
        maximizing: boolean,
        depth = 0,
        maxDepth = -1
    ): number => {
        const terminalObject = isTerminal(state);
        if (terminalObject || depth === maxDepth) {
            if (terminalObject && terminalObject.winner === "X") {
                return 100 - depth;
            } else if (terminalObject && terminalObject.winner === "O") {
                return -100 + depth;
            } else {
                return 0;
            }
        }

        if (maximizing) {
            let best = -100;
            // getAvailableMoves returning indexes of empty cell
            getAvailableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "X";

                // false because of minimizing ('O')
                const childValue = getBestMoveRecursive(child, false, depth + 1, maxDepth);
                best = Math.max(best, childValue);

                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]
                        ? `${childValues[childValue]}, ${index}`
                        : `${index}`;
                }
            });

            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }

            return best;
        } else {
            let best = 100;
            // getAvailableMoves returning indexes of empty cell
            getAvailableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "O";

                // true because of maximizing ('X')
                const childValue = getBestMoveRecursive(child, true, depth + 1, maxDepth);
                best = Math.min(best, childValue);

                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]
                        ? `${childValues[childValue]}, ${index}`
                        : `${index}`;
                }
            });

            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }

            return best;
        }
    };

    return getBestMoveRecursive(state, maximizing, depth, maxDepth);
};
