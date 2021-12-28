import {
    LOAD_MOVIES_DATA, FILTER_MOVIES_GERNE, FILTER_MOVIES_YEAR, FILTER_MOVIES_TYPE,
    FILTER_MOVIES_COUNTRY, SEARCH_BAR_TRUE, SEARCH_BAR_FALSE, RESET_POST_LIST, ADD_NEW_REVIEW
} from './constants';

export const loadMoviesDate = payload => ({
    type: LOAD_MOVIES_DATA,
    payload
})

export const setFilterGerne = payload => ({
    type: FILTER_MOVIES_GERNE,
    payload
})

export const setFilterYear = payload => ({
    type: FILTER_MOVIES_YEAR,
    payload
})

export const setFilterType = payload => ({
    type: FILTER_MOVIES_TYPE,
    payload
})

export const setFilterCountry = payload => ({
    type: FILTER_MOVIES_COUNTRY,
    payload
})

export const searchForMovies = payload => ({
    type: SEARCH_BAR_TRUE,
    payload
})

export const noSearch = () => ({
    type: SEARCH_BAR_FALSE
})

export const resetPostList = () => ({
    type: RESET_POST_LIST
})

export const addNewReview = payload => ({
    type: ADD_NEW_REVIEW,
    payload
})