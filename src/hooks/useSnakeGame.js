import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: 0 };
const GAME_SPEED = 150;

export const useSnakeGame = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
    });
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const generateFood = useCallback((currentSnake) => {
        let newFood;
        let isOnSnake;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (isOnSnake);
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        setFood(generateFood(INITIAL_SNAKE));
    };

    const changeDirection = useCallback((newDirection) => {
        setDirection((prev) => {
            // Prevent reversing direction
            if (prev.x + newDirection.x === 0 && prev.y + newDirection.y === 0) {
                return prev;
            }
            // Prevent moving if already moving in that axis (optional, but good for rapid key presses)
            return newDirection;
        });
    }, []);

    useEffect(() => {
        if (gameOver || isPaused || (direction.x === 0 && direction.y === 0)) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const head = prevSnake[0];
                const newHead = { x: head.x + direction.x, y: head.y + direction.y };

                // Wrap-around Logic
                if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
                if (newHead.x >= GRID_SIZE) newHead.x = 0;
                if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
                if (newHead.y >= GRID_SIZE) newHead.y = 0;

                // Check Self Collision
                if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check Food Collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s) => {
                        const newScore = s + 10;
                        if (newScore > highScore) {
                            setHighScore(newScore);
                            localStorage.setItem('snakeHighScore', newScore.toString());
                        }
                        return newScore;
                    });
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(gameInterval);
    }, [direction, food, gameOver, isPaused, highScore, generateFood]);

    return {
        snake,
        food,
        score,
        highScore,
        gameOver,
        isPaused,
        setIsPaused,
        resetGame,
        changeDirection,
        GRID_SIZE,
    };
};
