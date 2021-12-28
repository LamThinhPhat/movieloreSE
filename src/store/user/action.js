import { REGISTER_ACCOUNT } from './constant';

export const ValidateAccountFromDB = (payload) => ({
    type: REGISTER_ACCOUNT,
    payload
})