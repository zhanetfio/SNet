import React from 'react';
import style from './Header.module.css'
import {Button} from "antd";

export const Header = () => {
    return (
        <div className={style.headerWrapper}>
            <div className={style.logo}>
                SNet
            </div>
            <div className={style.buttonWrapper}>
                <Button  style={{margin: 5,backgroundColor:'#d7d7a7',color:'rgb(0, 21, 41)'}} className={style.button}>Log out</Button>
            </div>
        </div>
    );
};

