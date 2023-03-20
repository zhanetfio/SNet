import React from 'react';
import style from './Header.module.css'
import {Avatar, Button} from "antd";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setLogoutTC} from '../../../app/auth-reducer';
import {useNavigate} from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';

export const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profileName = useAppSelector(state => state.profile.profile?.fullName)
    const avatar = useAppSelector(state => state.profile.profile?.photos?.small)

    const logoutHandler = () => {
        dispatch(setLogoutTC())
    }

    /*  if (!isAuth) {
          navigate to={'/login'}/>
      }
  */

    return (
        <div className={style.headerWrapper}>
            <div className={style.logo}>
                SNet
            </div>

            <div className={style.buttonWrapper}>
                {isAuth
                    ?
                    <div style={{display:'flex'}}>
                        <Avatar src={avatar ? avatar : 'https://joesch.moe/api/v1/random?key=1'}
                                style={{marginRight: 20}}
                                shape="square" size={45} icon={<UserOutlined/>} onClick={()=> navigate('/profile')}/>
                        <Button onClick={logoutHandler}
                                style={{margin: 5, backgroundColor: '#d7d7a7', color: 'rgb(0, 21, 41)'}}
                                className={style.button}>Log out
                        </Button>
                    </div>
                    :
                    <Button onClick={() => navigate('/login')}
                            style={{margin: 5, backgroundColor: '#d7d7a7', color: 'rgb(0, 21, 41)'}}
                            className={style.button}>Log in
                    </Button>
                }
            </div>
        </div>
    )
        ;
};

