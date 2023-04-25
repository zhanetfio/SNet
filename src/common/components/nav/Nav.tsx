import React, {useState} from 'react';
import styles from './Nav.module.css'
import { NavLink } from "react-router-dom";


export const Nav = () => {
    const [collapsed, setCollapsed] = useState(false)



    return (
        <nav className={styles.nav}>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink to={'/profile'} activeClassName={styles.activeLink}>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={'/dialogs'} activeClassName={styles.activeLink}>Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={'/users'} activeClassName={styles.activeLink}>Users</NavLink>
            </div>

        </nav>

    )
}