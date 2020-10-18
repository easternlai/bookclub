import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/book';

const CommentItem = ({
    bookId, 
    comment: { _id, text, name, user, date},
    auth,
    deleteComment
}) => (
    <div>
        <div>
            <h4>{name}</h4>
        </div>
        <div>
            <p>{text}</p>
            <p>Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
            {user===auth.user._id && (
                <button 
                type='button'
                onClick={() => deleteComment(bookId, _id)}
                >
                Delete
                </button>
            )}
        </div>
    </div>
);

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    bookId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)