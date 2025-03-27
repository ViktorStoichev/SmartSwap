export const initialChatState = {
    messages: [],
    newMessage: '',
    partner: null
};

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return { ...state, messages: action.payload };
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_NEW_MESSAGE':
            return { ...state, newMessage: action.payload };
        case 'SET_PARTNER':
            return { ...state, partner: action.payload };
        default:
            return state;
    }
}