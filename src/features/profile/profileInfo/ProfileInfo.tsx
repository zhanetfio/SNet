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
                        <img src={profile.photos?.large || `${<Avatar
                            shape="square" size={45}
                            icon={<UserOutlined/>}
                        />}`}
                             className={s.mainPhoto}
                             alt={'large avatar'}/>
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


//
// const {Content} = Layout;
// const {TextArea} = Input;
// const {Paragraph} = Typography;
//
//
// export const ProfileInfo = () => {
//     const dispatch = useAppDispatch()
//     const userID = useAppSelector(state => state.profile.profile?.userId)
//     const avatar = useAppSelector(state => state.profile.profile?.photos?.large)
//     const name = useAppSelector(state => state.profile.profile?.fullName)
//     const users = useAppSelector(state => state.profile.profile?.users)
//
//     /*const [value, setValue] = useState('');*/
//
//     /*  const newUserAvatar = avatar ? avatar : ''*/
//
//     /*   const changeAvatar = (avatar: string,userID:number) => {
//            dispatch(changePhotoTC(avatar,userID))
//        };*/
//
//     const addImage = (e: ChangeEvent<HTMLInputElement>) => {
//
//         if (e.target.files?.length) {
//             changePhotoTC(e.target.files[0])
//             console.log(e.target.files[0])
//         }
//        /*   else return*/
//     }
//
//     useEffect(() => {
//         if (userID) {
//             dispatch(getUserProfile(userID))
//         }
//     }, [userID])
//
//     return (
//         <div>
//             <Content
//                 style={{
//                     display: 'flex',
//                     margin: '10px 16px',
//                     padding: 14,
//                     minHeight: 200,
//                     background: '#f5f5f5',
//                 }}
//             >
//                 <Row gutter={12} style={{flexFlow: 'nowrap'}}>
//                     <Col span={12}>
//                         <label>
//                             <input type="file"
//                                    name='file'
//                                    onChange={addImage}
//                                    style={{display: 'none'}}
//                             />
//                                <button >
//                                 Upload button
//                             </button>
//
//                             <Avatar src={avatar ? avatar : "https://joesch.moe/api/v1/random?key=1"}
//                                     style={{marginRight: 20}}
//                                     shape="square" size={150}/>
//                         </label>
//                     </Col>
//
//                     <Col span={12}>
//                         <div className={style.about}>
//                             <Paragraph style={{fontSize: 20}}>{name}</Paragraph>
//                             <span style={{fontWeight: 700}}>Looking for a a job:</span>
//                             <TextArea value={'Frontend Developer (React)'} bordered={false}/>
//                         </div>
//                     </Col>
//                     <Col span={12}>
//                         <div style={{fontWeight: 700}}>You can find me:</div>
//                         <Paragraph><span
//                             style={{fontWeight: 500}}> GitHub:</span>{users ? users.github : '..add link'} GitHub:{users ? users.github : '..add link'}
//                         </Paragraph>
//                     </Col>
//                 </Row>
//             </Content>
//         </div>
//     );
// };
