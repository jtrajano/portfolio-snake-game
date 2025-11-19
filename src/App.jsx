import React, { useEffect } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

function App() {
  const {
    snake,
    food,
    score,
    highScore,
    gameOver,
    isPaused,
    setIsPaused,
    resetGame,
    changeDirection,
    GRID_SIZE
  } = useSnakeGame();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          changeDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          changeDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          changeDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, setIsPaused]);

  return (
    <div className="app-container">
      <div className="game-wrapper">
        <h1 className="game-title">NEON SNAKE</h1>

        <ScoreBoard score={score} highScore={highScore} />

        <div className="board-container">
          <GameBoard snake={snake} food={food} gridSize={GRID_SIZE} />

          {gameOver && (
            <div className="overlay">
              <div className="game-over-modal">
                <h2>GAME OVER</h2>
                <p>Final Score: {score}</p>
                <button onClick={resetGame} className="restart-btn">
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}

          {isPaused && !gameOver && (
            <div className="overlay">
              <div className="paused-modal">
                <h2>PAUSED</h2>
                <p>Press SPACE to resume</p>
              </div>
            </div>
          )}
        </div>

        <div className="controls-hint">
          <p>Use ARROW KEYS to move • SPACE to pause</p>
        </div>
      </div>
    </div>
  );
}

export default App;
