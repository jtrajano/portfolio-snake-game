import React from 'react';
import styles from './ScoreBoard.module.css';

const ScoreBoard = ({ score, highScore }) => {
    return (
        <div className={styles.scoreBoard}>
            <div className={styles.scoreItem}>
                <span className={styles.label}>SCORE</span>
                <span className={styles.value}>{score}</span>
            </div>
            <div className={styles.scoreItem}>
                <span className={styles.label}>HIGH SCORE</span>
                <span className={styles.value}>{highScore}</span>
            </div>
        </div>
    );
};

export default ScoreBoard;
