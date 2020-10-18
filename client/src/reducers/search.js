import {
    ENTER_SEARCH,
    CLEAR_SEARCH
} from '../actions/types';

const initialState = {
    searchTerm: null,
    searchResults: null
}

export default function (state = initialState, action) {
    const {type, payload } = action;

    switch(type){
        case ENTER_SEARCH:
            return {
                ...state,
                searchTerm: payload.searchTerm,
                searchResults: payload.searchResults
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                searchTerm: null,
                searchResults: null
            }
        default:
            return state;
    }
}