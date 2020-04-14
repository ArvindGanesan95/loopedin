import {
    CHAT_HISTORY_LOADED,
    SENT_MESSAGE,
    FRIEND_SELECTED,
    RECENT_CHATS_LOADED
} from "../utils/dispatchUtils"

const initialState = {
    chatHistory: []
}

export default (state=initialState, action) => {
    switch(action.type){
        case CHAT_HISTORY_LOADED:
            return {...state, chatHistory: action.msg}
        case SENT_MESSAGE:
            return {...state, sentMessage: action.msg}
        case FRIEND_SELECTED:
            return {...state, selectedFriend: action.msg}
        case RECENT_CHATS_LOADED:
            return {...state, recentChats:  action.msg}
        default:
            return state;
    }
}