import React, {useRef, useState} from 'react';
import s from './ProfileInfo.module.css'
import {ContactsType, ProfileType} from '../ProfileContainer';
import ProfileDataForm from './ProfileDataForm';
import {Avatar, Button, Col, Layout, Row} from 'antd';
import {CameraOutlined, UserOutlined} from '@ant-design/icons';
import {Preloader} from '../../../common/preloader/Preloader';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType | null) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                savePhoto,
                                                                saveProfile
                                                            }) => {
    const ref = useRef<HTMLInputElement>(null);

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: { target: any }) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType | null) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.statusInfo}>
                    <div className={s.avatar}>
                        {profile.photos?.large
                       ? <img src={profile.photos?.large }
                             className={s.mainPhoto}
                             alt={'large avatar'}/>
                            :<Avatar shape="square" size={45}
                                     icon={<UserOutlined/>}
                            />
                             }
                        <div className={s.camera_button}>
                            <Button
                                type="default"
                                shape="circle"
                                icon={<CameraOutlined/>}
                                onClick={() => ref.current?.click()}

                            />
                        </div>
                    </div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

                {isOwner &&
                    <input
                        type={'file'}
                        onChange={onMainPhotoSelected}
                        ref={ref}
                        style={{display: 'none'}}
                    />
                }
                {editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}
            </div>
        </div>
    );
};

type ContactType = {
    contactTitle: string
    contactValue: string
}

export type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const {Content} = Layout;

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return <div className={s.contact}>
        <Content
            style={{
                display: 'flex',
                margin: '10px 16px',
                padding: 14,
                minHeight: 200,
                background: '#f5f5f5',
            }}
        >
            <Row gutter={12} style={{flexFlow: 'nowrap'}}>
                <Col span={12} className={s.selfInfo}>
                    <div className={s.infoItem}>
                        <span className={s.title}>Full name: </span> {profile.fullName}
                    </div>
                    <div className={s.infoItem}>
                        <span className={s.title}>Looking For A Job: </span>{profile.lookingForAJob ? 'yes' : 'no'}
                    </div>
                    {profile.lookingForAJob &&
                        <div className={s.infoItem}>
                            <span
                                className={s.title}>My professional skills: </span> {profile.lookingForAJobDescription}
                        </div>}
                    <div className={s.infoItem}>
                        <span className={s.title}>About Me: </span> {profile.aboutMe}
                    </div>
                </Col>
                <Col span={12} className={s.contactInfo}>
                    <div>
                    <span
                        className={s.title}>Contacts: </span> {profile.contacts && Object.keys(profile.contacts).map(key => {

                        return <Contact key={key} contactTitle={key}
                                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
                    </div>
                    {isOwner && <div className={s.button_edit}>
                        <button onClick={goToEditMode}>Edit</button>
                    </div>}
                </Col>
            </Row>
        </Content>
    </div>
}

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><span className={s.title}>{contactTitle}: </span> {contactValue}</div>
}
