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

