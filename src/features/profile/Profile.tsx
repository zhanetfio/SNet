import React from 'react';

import {ProfileType} from './ProfileContainer';
import styles from './Profile.module.css'
import PostsContainer from './posts/PostsContainer';
import {ProfileInfo} from './profileInfo/ProfileInfo';

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType | null) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={styles.container}>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                saveProfile={props.saveProfile}
                updateStatus={props.updateStatus}/>
            <PostsContainer/>
        </div>
    );
}
