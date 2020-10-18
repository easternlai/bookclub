import {
    GET_BOOKS,
    GET_BOOK,
    BOOK_ERROR,
    UPDATE_LIKES,
    ADD_BOOK,
    DELETE_BOOK,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

const initialState = {
    books: [],
    book: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action ) {
    const {type, payload} = action;

    switch(type) {
        case GET_BOOKS:
            return {
                ...state,
                books: payload,
                loading: false
            }
        case GET_BOOK:
            return {
                ...state,
                book: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                books: state.books.map(book => 
                    book._id ===payload.id ? {...book, likes: payload.likes}: book
                    ),
                    loading: false
            }
        case BOOK_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [payload, ...state.books],
                loading: false
            }
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book._id !=payload)
            }
        case ADD_COMMENT:
            return {
                ...state,
                book: { ...state.book, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                book: {
                    ...state.book,
                    comments: state.book.comments.filter(comment => 
                        comment._id !== payload
                    )
                }
            };
        default:
            return state;
    }
}