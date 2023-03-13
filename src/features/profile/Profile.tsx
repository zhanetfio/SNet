import React from 'react';
import {ProfileInfo} from "./profileInfo/ProfileInfo";
import {Posts} from "./posts/Posts";



export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <Posts/>
        </div>
    );
};

