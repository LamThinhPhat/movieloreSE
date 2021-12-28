import context from '../Context';
import { useReducer, useEffect } from 'react'
import reducer, { initState } from '../user/reducer';

function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <context.userContext value={{ state, dispatch }}>
            {props.children}
        </context.userContext>
    )
}

export default UserProvider;