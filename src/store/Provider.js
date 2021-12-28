import Context from './Context'
import { useReducer, useEffect } from 'react'
import reducer, { initState } from './reducer';
import axios from 'axios';
import { actions } from '.';

function Provider(props) {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        axios.get('http://localhost:4000/movies')
            .then(function (res) {
                let data = res && res.data ? res.data : [];
                dispatch(actions.loadMoviesDate(data));
            })
    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider;