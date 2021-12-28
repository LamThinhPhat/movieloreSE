import { STORE_LOGIN_ACCOUNT, LOGOUT_ACCOUNT } from './constant';

//store account after login
export const StoreAccount = (payload) => ({
    type: STORE_LOGIN_ACCOUNT,
    payload
})

export const logOut = () => ({
    type: LOGOUT_ACCOUNT,
})