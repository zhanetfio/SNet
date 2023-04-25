import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './ProfileInfo.module.css'
import style from '../../../common/forms/FormControls.module.css'
import {ProfileType} from '../ProfileContainer';
import {createField, Input, Textarea} from '../../../common/forms/FormsControls';


const ProfileDataForm = (props: InjectedFormProps<ProfileType>) => {
    const {handleSubmit, initialValues, error} = props
    return <div className={s.profile_container}>
        <form onSubmit={handleSubmit}>
            <div>
                <span className={style.title}>Full name: </span> {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <div className={style.title}>Looking For A Job:</div>
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>

            <div>
            <span className={style.title}>My professional
                skills: </span> {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <span className={style.title}>About me: </span> {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <span className={style.title}>Contacts: </span> {Object.keys(initialValues.contacts ?? {}).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, 'users.' + key, [], Input)}</b>
                </div>
            })}
            </div>
            <div className={style.button_save}>
                <button onClick={handleSubmit}>Save</button>
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
            </div>
        </form>
    </div>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;