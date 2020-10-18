import axios from 'axios';
import {
    ENTER_SEARCH
} from './types';

import API from '../components/utils/API';

export const searchTerm = (query) => async(dispatch) =>{
    delete axios.defaults.headers.common['x-auth-token'];
    const res = await API.search(query);
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    
    dispatch({
        type: ENTER_SEARCH,
        payload: {searchTerm: query, searchResults: res.data.items}
    });
}