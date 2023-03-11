import React from 'react';
import style from './Header.module.css'

export const Header = () => {
    return (
        <div className={style.headerWrapper}>
            <div className={style.logo}>
                SNet
            </div>
            <div className={style.buttonWrapper}>
                <button className={style.button}>Log out</button>
            </div>
        </div>
    );
};

