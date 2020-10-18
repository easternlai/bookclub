import axios from "axios";
import { setAlert } from "../actions/alert";
import { GET_BOOKS, BOOK_ERROR, UPDATE_LIKES, ADD_BOOK, DELETE_BOOK, GET_BOOK, ADD_COMMENT, REMOVE_COMMENT } from "./types";

export const getBooks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/books");
  

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id) => async (dispatch ) => {
    try {
        const res = await axios.put(`/api/books/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/books/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: BOOK_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const addBook = (title, author, image) => async (dispatch) => {
  
  try {
    const res = await axios.post("/api/books", {title, author, image});
    dispatch({
      type: ADD_BOOK,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const deleteBook = (id) => async (dispatch) => {
  
  
  try {
    const res = await axios.delete(`/api/books/${id}`);
    
    dispatch({
      type: DELETE_BOOK,
      payload: id
    })
    
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      playload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const getBook = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/books/${id}`);

    dispatch({
      type: GET_BOOK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      playload: {msg: err.response.statusText, status: err.response.status}
    })
  }
} 

export const addComment = (id, formData) => async(dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/books/comment/${id}`, formData, config);
    
    dispatch({ 
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch ({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (bookId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/books/comment/${bookId}/${commentId}`);
    dispatch ({
      type: REMOVE_COMMENT,
      payload: commentId
    });
  } catch (err) {
    dispatch ({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}