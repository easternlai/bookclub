import React , {Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect } from 'react-redux';
import {addLike, removeLike, deleteBook} from '../../actions/book';

const BookItem = ({addLike, removeLike, deleteBook, auth, book: {_id, user, name, title, author, likes, comments}, showActions}) => {
    return (
        <div>
            <div>
                <Link to={`/profile/${user}`}>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p>{title} by {author}</p>
            </div>
            {showActions && <Fragment>
                <button 
                type="button"
                onClick={() => addLike(_id)}
                >
                    <span>{likes.length > 0 ? <span>{likes.length}</span>: <p>like</p>}</span>
                </button>
                <button 
                type="button"
                onClick={()=> removeLike(_id)}>
                    <span>unlike</span>
                </button>
                <Link to={`/books/${_id}`}>
                    Discussion{" "}
                    {comments.length > 0 && (
                        <span>{comments.length}</span>
                    )}
                </Link>
                {user === auth.user._id && (
                    <button 
                    type="button"
                    onClick={() => deleteBook(_id)}>
                        Delete
                    </button>
                )}
            </Fragment>}
        </div>
    )
}

BookItem.defaultProps = {
    showActions: true
};

BookItem.propType = {
    book: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike, deleteBook})(BookItem);