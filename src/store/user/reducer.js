import {
    STORE_LOGIN_ACCOUNT, LOGOUT_ACCOUNT, STORE_NEW_INFORMATION, CHANGE_NEW_PASSWORD, ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE, READ_ALL_NOTIFICATION
} from './constant';

const initState = {
    id: null,
    name: null,
    email: null,
    password: null,
    favorite: [],
    notification: [],
    role: false
}

function reducer(state, action) {
    switch (action.type) {
        case STORE_LOGIN_ACCOUNT:
            return {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                role: action.payload.role,
                favorite: action.payload.favorite,
                notification: action.payload.notification
            }
        case LOGOUT_ACCOUNT:
            return {
                id: null,
                name: null,
                email: null,
                password: null,
                role: false,
                favorite: [],
                notification: [],
            }
        case STORE_NEW_INFORMATION:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
            }
        case CHANGE_NEW_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case ADD_TO_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite, action.payload]
            }
        case REMOVE_FROM_FAVORITE: {
            const removeFav = state.favorite.filter(item => item !== action.payload)
            return {
                ...state,
                favorite: removeFav
            }
        }
        case READ_ALL_NOTIFICATION: {
            return {
                ...state,
                notification: state.notification.map(item => ({ ...item, status: false }))
            }
        }
        default:
            throw new Error('user invalid action');
    }
}

export { initState };
export default reducer;