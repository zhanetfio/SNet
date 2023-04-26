import React from 'react';
import styles from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={styles.preloaderContainer}>
            <div className={styles.preloaderBox}>
                <div>LOADING...</div>
            </div>
        </div>
    );
};
