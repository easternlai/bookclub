import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookItem from '../books/BookItem';
import { getBook } from '../../actions/book';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


const Book = ({ getBook, book: { book }, match}) => {
useEffect(() => {
    getBook(match.params.id);
}, [getBook, match.params.id]);

return book === null ? (<div> loading...</div>):(
    <Fragment>
        <Link to="/books">
            Back to All Books
        </Link>
        <BookItem 
        book={book} 
        showActions={false}>
        </BookItem>
        <CommentForm bookId={book._id}/>
        <div>
            {book.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} bookId={book._id}></CommentItem>
            ))}
        </div>

        
    </Fragment>
)

}

Book.propTyes = {
    getBook: PropTypes.func.isRequired
}

const mapStateToProps = state=> ({ 
    book: state.book
});

export default connect (mapStateToProps, { getBook })  (Book);