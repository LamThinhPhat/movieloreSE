import { STORE_LOGIN_ACCOUNT, LOGOUT_ACCOUNT } from './constant';

const initState = {
    name: null,
    email: null,
    password: null,
    role: false
}

function reducer(state, action) {
    switch (action.type) {
        case STORE_LOGIN_ACCOUNT:
            return {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                role: action.payload.role
            }
        case LOGOUT_ACCOUNT:
            return {
                name: null,
                email: null,
                password: null,
                role: false
            }
        default:
            throw new Error('user invalid action');
    }
}

export { initState };
export default reducer;