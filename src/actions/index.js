import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId, //accept user id and store it in the payload
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// following RESTful conventions to create action creators

// create record POST
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    //getState method, second argu of the redux-thunk to get app state info

    //get userId to know who just created the stream, that is from google auth
    const { userId } = getState().auth;
    const response = await streams.post('/streams', {
      ...formValues,
      userId,
    });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });

    // programmatic navigation to get the user back to the root route after successfully create a stream

    // push to navigate user
    history.push('/');
  };
};

// list all records GET
export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get('/streams');

    dispatch({
      type: FETCH_STREAMS,
      payload: response.data,
    });
  };
};

// get one particular record GET
export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
      type: FETCH_STREAM,
      payload: response.data,
    });
  };
};

// update a record PUT
export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
      type: EDIT_STREAM,
      payload: response.data,
    });

    // push to navigate user
    history.push('/');
  };
};

// delete a record DELETE
export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({
      type: DELETE_STREAM,
      payload: id,
    });

    // push to navigate user
    history.push('/');
  };
};
