import context from '../Context';
import { useReducer, useEffect } from 'react'
import MovieReducer, { initState } from './reducer';
import axios from 'axios';
import { movieActions } from '..';

function MovieProvider(props) {
    const [state, dispatch] = useReducer(MovieReducer, initState);

    useEffect(() => {
        axios.get('https://movielore-database.herokuapp.com')
            .then(function (res) {
                let data = res && res.data ? res.data : [];
                dispatch(movieActions.loadMoviesDate(data.reverse()));
            })
            .catch(function (e) {
                console.log(e);
            })
    }, [])

    return (
        <context.movieContext.Provider value={{ state, dispatch }}>
            {props.children}
        </context.movieContext.Provider>
    )
}

export default MovieProvider;