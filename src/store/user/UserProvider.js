import context from '../Context';
import { useReducer } from 'react'
import reducer, { initState } from './reducer';

function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <context.userContext.Provider value={{ userState: state, userDispatch: dispatch }}>
            {props.children}
        </context.userContext.Provider>
    )
}

export default UserProvider;