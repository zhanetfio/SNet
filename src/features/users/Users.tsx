import React from 'react';
import styles from './Users.module.css'
import {UserType} from './users-reducer';
import {User} from './User';
import {Pagination} from '../../common/pagination/Pagination'

type PropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
    portionSize: number
}

export const Users: React.FC<PropsType> = ({
                                        users,
                                        totalUsersCount,
                                        pageSize,
                                        currentPage,
                                        onPageChanged,
                                        portionSize,
                                        ...props
                                    }) => {

    return <div className={styles.container}>
        <div className={styles.users}>
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     follow={props.follow}
                                     unfollow={props.unfollow}
                                     followingInProgress={props.followingInProgress}
                />)
            }
        </div>
        <div>
            <Pagination portionSize={portionSize}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />
        </div>
    </div>
};



/*

const {Content} = Layout;

export const Contacts = () => {
    return (
        <div>
            <Content>
                Users
            </Content>
        </div>
    );
};

*/
