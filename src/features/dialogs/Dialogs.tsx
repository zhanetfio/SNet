import React from 'react';
import styles from './Dialogs.module.css'
import {Message, MessageType} from './message/Message';
import {AddMessageFormRedux} from './addMessageForm/AddMessageForm';
import {DialogItem, DialogsType} from './dialogItem/DialogItem';
import {Redirect} from 'react-router-dom';
import {Layout} from 'antd';

type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
    sendMessage: (values: string) => void
    isAuth: boolean
}
const{Content}=Layout;

export const Dialogs = (props: DialogsPageType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>);

    let messagesElements = props.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody);
        values.newMessageBody = '';
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>;

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <Content style={{backgroundColor:'#001529',borderRadius:'20px',minWidth:"50vw",height:'75vh'}}>
            <div className={styles.messages}>
                <div className={styles.messagesBlock}>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
            </Content>
        </div>
    );
};


