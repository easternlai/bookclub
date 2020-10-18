import React, {Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import API from '../utils/API';
import SuggestBookItem from './SuggestBookItem';
import {searchTerm} from '../../actions/search';

const SuggestBook = ({searchTerm, search: {searchResults}}) => {
    const [book, setBook] = useState('');

    const onChange = (e)=> {
        setBook(e.target.value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        searchTerm(book);

    }

    return(<Fragment>
        <p>Enter Book</p>
        
        <form onSubmit={e => onSubmit(e)}>
        <input type="text" value={book} onChange={e => onChange(e)}/>
        <input type="submit" value="submit" />
        </form>

        {searchResults &&  ( 
            <SuggestBookItem key={book.id} 
            title={searchResults[0].volumeInfo.title} 
            author={searchResults[0].volumeInfo.authors[0]} 
            image={searchResults[0].volumeInfo.imageLinks ? searchResults[0].volumeInfo.imageLinks.thumbnail: './No-Image-Found.png'}/>)
        }
        
    </Fragment>)

}

SuggestBook.propTypes = {
    searchTerm: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    search: state.search
});



export default connect(mapStateToProps, {searchTerm})(SuggestBook);