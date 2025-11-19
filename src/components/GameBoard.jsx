import React from 'react';
import styles from './GameBoard.module.css';

const GameBoard = ({ snake, food, gridSize }) => {
    // Create a grid representation
    const renderGrid = () => {
        const cells = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                let className = styles.cell;

                // Check if snake segment
                const isSnakeHead = snake[0].x === x && snake[0].y === y;
                const isSnakeBody = snake.some((s, index) => index !== 0 && s.x === x && s.y === y);

                if (isSnakeHead) className = `${styles.cell} ${styles.snakeHead}`;
                else if (isSnakeBody) className = `${styles.cell} ${styles.snakeBody}`;
                else if (food.x === x && food.y === y) className = `${styles.cell} ${styles.food}`;

                cells.push(
                    <div key={`${x}-${y}`} className={className} />
                );
            }
        }
        return cells;
    };

    return (
        <div
            className={styles.board}
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
        >
            {renderGrid()}
        </div>
    );
};

export default GameBoard;
