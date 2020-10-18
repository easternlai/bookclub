import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getBooks } from '../../actions/book';
import BookItem from './BookItem';

const Books =({ getBooks, book: { books, loading} }) => {
    useEffect(() => {
        getBooks();
    }, [getBooks]);

    return(<Fragment>
        <h1>Books</h1>
        <div>
            {books.map(book => (
                <BookItem key={book._id} book={book} /> 
            ))}
        </div>

    </Fragment>)
};

Books.propTypes = {
    getBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    book: state.book
})

export default connect(mapStateToProps, {getBooks})(Books);