import React from 'react';
import styles from './Error404.module.css'
import errorImg from '../../assets/images/5191984.jpg'
import {Button} from 'antd';
import {Redirect} from 'react-router-dom';

export const Error404 = () => {
    return (
        <div className={styles.error404}>
            <img className={styles.img_error} src={errorImg} alt={'Page not found'}/>
            <Button onClick={()=><Redirect to={'/profile'}/>}>Back to profile</Button>
        </div>
    );
};
