import './searchBar.scss'
import { Search } from '@material-ui/icons'
import { useContext } from 'react'
import { Context } from "../../../store"
import { movieActions } from '../../../store'
import { useHistory } from 'react-router-dom'

function SearchBar() {
    const { dispatch } = useContext(Context.movieContext);
    const history = useHistory();

    const handleSeachMovies = (event) => {
        if (event.key === 'Enter') {
            history.push('/');
            if (event.target.value !== '') dispatch(movieActions.searchForMovies(event.target.value));
            else dispatch(movieActions.noSearch());
            event.target.value = '';
        }
    }

    return (
        <div className="search-bar">
            <Search className="search-icon" />
            <input className="seach-input" onKeyDown={handleSeachMovies} type="text" placeholder="Tìm kiếm..." />
        </div>
    )
}

export default SearchBar;