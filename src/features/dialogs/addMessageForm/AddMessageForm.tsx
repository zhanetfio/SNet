import React, {FC} from 'react';
import styles from './AddMessageForm.module.css'
import {maxLengthCreator, required} from '../../../utils/validators/validator';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../../common/forms/FormsControls';

type DialogsFormPropsType = {
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50);
const AddMessageForm: FC<InjectedFormProps<DialogsFormPropsType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.container}>
                <Field  style={{width:'350px', height:'50px',borderRadius:'10px',padding:'10px'}}
                    component={Textarea}
                       name={'newMessageBody'}
                       validate={[required, maxLength50]}
                       placeholder={'Enter your message'}
                       row={3}
                />

                <button  type={'submit'}>Send</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<DialogsFormPropsType>({form: 'dialogAddMessageForm'})(AddMessageForm)