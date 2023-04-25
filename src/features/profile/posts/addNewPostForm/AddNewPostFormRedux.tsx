import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import styles from './AddNewPostForm.module.css'
import {maxLengthCreator, required} from '../../../../utils/validators/validator';
import {Textarea} from '../../../../common/forms/FormsControls';

type MyPostFormPropsType = {
    newPostText: string
}
const maxLength30 = maxLengthCreator(30);
const AddNewPostForm: FC<InjectedFormProps<MyPostFormPropsType>> = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div style={{fontSize: 22,fontWeight:600,color:'#d7d7a7'}}>My Posts</div>
            <div className={styles.container}>
                <Field
                    style={{width:'350px', height:'70px',borderRadius:'10px',padding:'10px'}}
                    component={Textarea}
                    name={'newPostText'}
                    validate={[required, maxLength30]}
                    placeholder={'Post message'}
                    rows={2}
                />
                <div>
                    <button className={styles.button} type={'submit'}>Add post</button>
                </div>
            </div>
        </form>
    )
}
export const AddNewPostFormRedux = reduxForm<MyPostFormPropsType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)