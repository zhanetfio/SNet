import React from 'react';
import styles from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export type DialogsType = {
    id: number
    name: string
    avatar: string
}

export const DialogItem = (props: DialogsType) => {
    let path = '/dialogs/' + props.id


    return (
        <div className={styles.dialog + ' ' + styles.active}>
            {props.avatar ?
                <img className={styles.avatar} src={props.avatar} alt={'avatar'}/>
                : <Avatar icon={<UserOutlined />}/>
            }
            <NavLink to={path}><span className={styles.name}>{props.name}</span></NavLink>
        </div>
    )
}
