import React from 'react';
import styles from './Auth.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>Mengautentikasi...</div>
            <div className={styles.loadingSubtext}>Mohon tunggu sebentar</div>
        </div>
    );
};

export default LoadingScreen;
