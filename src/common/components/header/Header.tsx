import React from 'react';
import styles from './Header.module.css'
import {Avatar, Button} from "antd";
import { useAppSelector} from '../../hooks/hooks';
import {NavLink} from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void,
}

export const Header: React.FC<HeaderPropsType> = (props) => {

    const photo = useAppSelector(state => state.profilePage.profile.photos?.small)

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.logo}>SNet</div>

            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div className={styles.logout}>{props.login} {<img className={styles.avatar}
                                                                         src={photo || `${<Avatar
                                                                             src='https://joesch.moe/api/v1/random?key=1'
                                                                             style={{marginRight: 20}}
                                                                             shape="circle" size={35}
                                                                             icon={<UserOutlined/>}
                                                                             onClick={() => <NavLink to={'/profile'} />}/>}`}
                                                                         alt={'avatar'}/>}
                        <Button
                            type={'default'}
                            shape="round"
                            onClick={props.logout}
                        >Log out
                        </Button>
                    </div>
                    : <div className={styles.logout}>
                        <NavLink style={{textDecoration: 'none'}} to={'/login'}></NavLink>
                    </div>
                }
            </div>
        </header>
    );
};
