import { STORE_LOGIN_ACCOUNT, LOGOUT_ACCOUNT, STORE_NEW_INFORMATION, CHANGE_NEW_PASSWORD, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './constant';

//store account after login
export const StoreAccount = (payload) => ({
    type: STORE_LOGIN_ACCOUNT,
    payload
})

export const logOut = () => ({
    type: LOGOUT_ACCOUNT,
})

export const storeNewInfo = (payload) => ({
    type: STORE_NEW_INFORMATION,
    payload
})

export const storeNewPass = (payload) => ({
    type: CHANGE_NEW_PASSWORD,
    payload
})

export const addToFavorite = (payload) => ({
    type: ADD_TO_FAVORITE,
    payload
})

export const removeFromFavorite = (payload) => ({
    type: REMOVE_FROM_FAVORITE,
    payload
})
