import {combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import book from './book';
import search from './search';

export default combineReducers({
    alert,
    auth, 
    book,
    search
});