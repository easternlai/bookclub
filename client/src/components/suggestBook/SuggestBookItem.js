import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CardButton from '../layout/CardButton';
import {addBook} from '../../actions/book';

const SuggestBookItem = ({search, title, author, image, addBook}) => {

    return(<Fragment>
        <p>{title}</p>
        <img src={image}></img>
        <button onClick={(e)=> {
            e.preventDefault();
            addBook(title, author, image);
            }
        }>save</button>
    </Fragment>
    )
    }

SuggestBookItem.propTypes = {
    search: PropTypes.object.isRequired,
    addBook: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    search: state.search
});

export default connect(mapStateToProps, {addBook})(SuggestBookItem)