import './searchBar.scss'
import { Search } from '@material-ui/icons'
import { useContext } from 'react'
import { MovieContext } from "../../store"
import { actions } from '../../store'

function SearchBar() {
    const { dispatch } = useContext(MovieContext);

    const handleSeachMovies = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value !== '') dispatch(actions.searchForMovies(event.target.value));
            else dispatch(actions.noSearch());
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