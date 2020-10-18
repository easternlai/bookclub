import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addComment} from '../../actions/book';

const CommentForm = ({ bookId, addComment }) => {
    const [text, setText ] = useState('');

    return ( 
        <div>
            <h3> Leave a comment</h3>
            <form onSubmit= {e => {
                e.preventDefault();
                addComment(bookId, {text});
                setText(''); 
            }}>
                <textarea
                name='text'
                cols='30'
                rows='5'
                placeholder='comment the post'
                value={text}
                onChange={ e => setText(e.target.value)}
                required
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm);