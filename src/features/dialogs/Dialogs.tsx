import React from 'react';
import styles from './Dialogs.module.css'
import {Message, MessageType} from './message/Message';
import {AddMessageFormRedux} from './addMessageForm/AddMessageForm';
import {DialogItem, DialogsType} from './dialogItem/DialogItem';
import {Redirect} from 'react-router-dom';

type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
    sendMessage: (values: string) => void
    isAuth: boolean
}

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
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};



/*

const {Content} = Layout;
const {TextArea} = Input;
const {Meta} = Card;

const fakeData = [
    'Anna',
    'Lena',
    'Sveta',
    'Dima',
    'Sergey'

];

export const Dialogs = () => {
    return (
        <div>
            <Row gutter={8}>
                <Col flex={4}>
                    <Content style={{
                        background: '#001529',
                        borderRadius: 5,
                        margin: '10px 16px',
                        padding: 24,
                    }}>
                        <div style={{color: '#d7d7a7'}}>
                            <>
                                <Card style={{width: 300, marginTop: 10, padding: 0, textAlign: 'start'}} >
                                    <Meta
                                        avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1"/>}
                                        title="UserName"
                                        description="Hello!"
                                    />
                                </Card>

                                <Card style={{width: 300, marginTop: 10, padding: 0, textAlign: 'start'}} >
                                    <Meta
                                        avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1"/>}
                                        title="UserName"
                                        description="How are you?"
                                    />
                                </Card>
                            </>
                        </div>
                        <div style={{display:'flex',marginTop:20}}>
                            <TextArea value={'Write message... '}/>
                            <Button  style={{margin: 5,backgroundColor:'#d7d7a7'}}>Send</Button>
                        </div>
                    </Content>
                </Col>
                <Col flex={1}>
                    <Content style={{
                        background: '#f5f5f5',
                        borderRadius: 5,
                        margin: '10px 16px',

                    }}>

                        <List
                            size="small"
                            header={<h1 style={{color: '#001529'}}>Users</h1>}
                            bordered
                            dataSource={fakeData}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />

                    </Content>
                </Col>
            </Row>
        </div>
    );
};

*/
