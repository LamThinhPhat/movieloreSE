import { REGISTER_ACCOUNT } from './constant';

const initState = {
    isLoading: true,
    name: '',
    email: '',
    password: '',
    role: false
}

function reducer(state, action) {
    switch (action.type) {

        default:
            throw new Error('user invalid action');
    }
}

export { initState };
export default reducer;