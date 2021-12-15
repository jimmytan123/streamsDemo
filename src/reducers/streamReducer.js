import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from '../actions/types';

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // since mapKeys return a big object, so we need to use ... to add into the overall object
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    // case fetch, create, edit return the same syntax since the response all return a single record
    case FETCH_STREAM:
      // copy and create a new state, add key/value
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM: {
      return { ...state, [action.payload.id]: action.payload };
    }

    case EDIT_STREAM: {
      return { ...state, [action.payload.id]: action.payload };
    }

    case DELETE_STREAM:
      // use lodash omit method to omit a object
      return _.omit(state, action.payload);

    // if using Vanilla JS
    //const newState = { ...state };
    //delete newState[action.payload];
    //return newState;

    default:
      return state;
  }
};

export default streamReducer;
