import {DialogsType} from './dialogItem/DialogItem';
import {MessageType} from './message/Message';
import {v1} from 'uuid';


let initialState = {
    dialogs: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Kristi'},
        {id: 4, name: 'Helen'},
    ] as Array<DialogsType>,
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are you?'},
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsDialogsTypes): InitialStateType => {

    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: body}]
            };
        default:
            return state;
    }
}

export type ActionsDialogsTypes = ReturnType<typeof sendMessageAC>

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: 'DIALOGS/SEND-MESSAGE',
        newMessageBody
    } as const
}



/*


const initialState = {
    dialogData: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Kristi'},
        {id: 4, name: 'Helen'},
    ] as Array<DialogsType>,
    messageData: [
        {id: 1, message: 'Hi yo!'},
        {id: 1, message: 'How are you'},
        {id: 1, message: 'Good night!'},
        {id: 1, message: 'Hello!'},
    ] as Array<MessageType>,
    newMessageBody: ""
}

export const dialogsReducer = (state: MessagePageType = initialState, action: DialogsActionTypes): MessagePageType => {
    switch (action.type) {
        case 'DIALOGS/UPDATE-NEW-MESSAGE-BODY': {
            return {...state, newMessageBody: action.body};
        }
        case 'DIALOGS/SEND-MESSAGE': {
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messageData: [...state.messageData, {id: 5, message: body}]
            }
        }
        default:
            return state
    }
}
export const sendMessage = () => {
    return {
        type: 'DIALOGS/SEND-MESSAGE'
    }as const
}
export const updateNewMessageBody = (body: string) => {
    return {
        type: 'DIALOGS/UPDATE-NEW-MESSAGE-BODY',
        body: body
    }as const
}


//types
export type MessageType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagePageType = {
    dialogData: Array<DialogsType>
    messageData: Array<MessageType>
    newMessageBody:string
}

export type DialogsActionTypes = ReturnType<typeof sendMessage> | ReturnType<typeof updateNewMessageBody>*/