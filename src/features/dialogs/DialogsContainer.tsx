import {DialogsType} from './dialogItem/DialogItem';
import React from 'react';
import {MessageType} from './message/Message';
import {AppDispatch, AppRootStateType} from '../../app/store';
import {compose} from 'redux';
import {sendMessageAC} from './dialogs-reducer';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';

type mapStateToPropsType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessageType>,
    isAuth: boolean,
}

type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void,
}

let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): mapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps),
)(Dialogs);