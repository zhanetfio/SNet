import React from 'react';
import styles from './Users.module.css';
import {NavLink} from 'react-router-dom';
import {Avatar, Button} from 'antd';
import {UserAddOutlined, UserDeleteOutlined, UserOutlined} from "@ant-design/icons";
import {UserType} from './users-reducer';

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <div className={styles.user}>

            <div className={styles.userImage}>
                <NavLink to={'/profile/' + user.id}>
                    {user.photos.small
                        ? <img src={user.photos.small} alt={`user's avatar`}
                               className={styles.userPhoto}/>
                        : <Avatar

                            shape="square" size={80}
                            icon={<UserOutlined/>}
                        />}
                </NavLink>
            </div>
            <div className={styles.userBtn}>
                {user.followed
                    ? <Button className={styles.followUnfollowButton} type={'primary'}
                              disabled={followingInProgress
                                  .some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</Button>
                    : <Button className={styles.followUnfollowButton} type={'primary'}
                              disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}><UserAddOutlined/>Follow</Button>}

            </div>
            <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
            <span>
                                <div>{user.location?.country}</div>
                                <div>{user.location?.city}</div>
                            </span>
        </div>

    )
        ;
};