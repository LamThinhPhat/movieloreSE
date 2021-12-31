import {
    LOAD_MOVIES_DATA, FILTER_MOVIES_GERNE, FILTER_MOVIES_YEAR, FILTER_MOVIES_TYPE,
    FILTER_MOVIES_COUNTRY, SEARCH_BAR_TRUE, SEARCH_BAR_FALSE, RESET_POST_LIST, ADD_NEW_REVIEW, DELETE_REVIEW, UPDATE_REVIEW
} from './constants';

const initState = {
    movies: [],
    filter: [],
    gerne: [],
    year: 'Tất cả',
    type: 'Tất cả',
    country: 'Tất cả',
    searchFilter: '',
    isSearch: false,
    isLoading: true,
}

const chosen = (filter, movie) => filter.every(r => movie.includes(r))

function reducer(state, action) {
    switch (action.type) {
        case LOAD_MOVIES_DATA:
            return {
                ...state,
                movies: action.payload,
                filter: action.payload,
                isLoading: false,
            }
        case FILTER_MOVIES_GERNE: {
            let temp = state.movies;
            if (state.isSearch)
                temp = temp.filter(item => item.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
            if (state.year !== 'Tất cả')
                temp = state.movies.filter(movie => movie.releaseDate.substring(0, movie.releaseDate.indexOf('-')) === state.year)
            if (state.type !== 'Tất cả')
                temp = temp.filter(movie => movie.type === state.type)
            if (state.country !== 'Tất cả')
                temp = temp.filter(item => item.country === state.country)
            temp = temp.filter(movie => chosen(action.payload, movie.gerne))
            return {
                ...state,
                gerne: action.payload,
                filter: temp
            }
        }
        case FILTER_MOVIES_YEAR: {
            let temp = state.movies;
            if (state.isSearch)
                temp = temp.filter(item => item.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
            if (action.payload !== 'Tất cả')
                temp = state.movies.filter(movie => movie.releaseDate.substring(0, movie.releaseDate.indexOf('-')) === action.payload)
            if (state.type !== 'Tất cả')
                temp = temp.filter(movie => movie.type === state.type)
            if (state.country !== 'Tất cả')
                temp = temp.filter(item => item.country === state.country)
            temp = temp.filter(movie => chosen(state.gerne, movie.gerne))
            return {
                ...state,
                year: action.payload,
                filter: temp
            }
        }
        case FILTER_MOVIES_TYPE: {
            let temp = state.movies;
            if (state.isSearch)
                temp = temp.filter(item => item.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
            if (state.year !== 'Tất cả')
                temp = state.movies.filter(movie => movie.releaseDate.substring(0, movie.releaseDate.indexOf('-')) === state.year)
            if (action.payload !== 'Tất cả')
                temp = temp.filter(movie => movie.type === action.payload)
            if (state.country !== 'Tất cả')
                temp = temp.filter(item => item.country === state.country)
            temp = temp.filter(movie => chosen(state.gerne, movie.gerne))
            return {
                ...state,
                type: action.payload,
                filter: temp
            }
        }
        case FILTER_MOVIES_COUNTRY: {
            let temp = state.movies;
            if (state.isSearch)
                temp = temp.filter(item => item.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
            if (state.year !== 'Tất cả')
                temp = state.movies.filter(movie => movie.releaseDate.substring(0, movie.releaseDate.indexOf('-')) === state.year)
            if (state.type !== 'Tất cả')
                temp = temp.filter(movie => movie.releaseDate.substring(movie.releaseDate.length - 4) === state.type)
            if (action.payload !== 'Tất cả')
                temp = temp.filter(item => item.country === action.payload)
            temp = temp.filter(movie => chosen(state.gerne, movie.gerne))
            return {
                ...state,
                country: action.payload,
                filter: temp
            }
        }
        case SEARCH_BAR_TRUE: {
            let temp = state.movies.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                gerne: [],
                year: 'Tất cả',
                type: 'Tất cả',
                country: 'Tất cả',
                searchFilter: action.payload,
                filter: temp,
                isSearch: true
            }
        }
        case SEARCH_BAR_FALSE:
            return {
                ...state,
                isSearch: false,
                filter: state.movies,
                gerne: [],
                searchFilter: '',
                year: 'Tất cả',
                type: 'Tất cả',
                country: 'Tất cả',
            }
        case RESET_POST_LIST:
            return {
                ...state,
                isSearch: false,
                filter: state.movies,
                gerne: [],
                searchFilter: '',
                year: 'Tất cả',
                type: 'Tất cả',
                country: 'Tất cả',
            }
        case ADD_NEW_REVIEW: {
            let temp = state.movies;
            temp.unshift(action.payload);
            return {
                ...state,
                movies: temp,
                filter: temp,
                isSearch: false,
                gerne: [],
                searchFilter: '',
                year: 'Tất cả',
                type: 'Tất cả',
                country: 'Tất cả',
            }
        }
        case DELETE_REVIEW:
            return {
                ...state,
                movies: state.movies.filter(item => item._id !== action.payload),
                filter: state.movies.filter(item => item._id !== action.payload),
            }
        case UPDATE_REVIEW: {
            const newMovies = state.movies.map(item => {
                if (item._id === action.payload._id) return action.payload
                else return item;
            });

            return {
                ...state,
                movies: newMovies,
                filter: newMovies
            }
        }

        default:
            throw new Error('movie invalid action')
    }
}

export { initState };
export default reducer;