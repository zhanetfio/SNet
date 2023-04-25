import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {Profile} from './Profile';
import {AppRootStateType} from '../../app/store';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from './profile-reducer';

export type ProfileType = {
    aboutMe?: string
    contacts: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos?: PhotosType
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (status: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType | null) => void
}

type PathParamsType = {
    userId: string
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: string | undefined = this.props.match.params.userId;
        if (!userId) {

            userId = this.props.authorizedUserId?.toString()
            if (!userId) {
                return this.props.history.push('/login');
            }
        }


        this.props.getUserProfile(Number(userId))
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {

        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);