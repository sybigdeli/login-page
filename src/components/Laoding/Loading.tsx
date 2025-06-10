import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <span className={styles.loadingText}>loading...</span>
            </div>
        </div>
    );
};

export default Loading;