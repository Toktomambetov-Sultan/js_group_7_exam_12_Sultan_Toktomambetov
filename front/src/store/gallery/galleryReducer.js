import {
  FETCH_SUCCESS,
  SET_PHOTOS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_CURRENT_USER,
} from "../actionsTypes";

const initialState = {
  isLoading: false,
  photos: [],
  error: null,
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: action.data };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.data };
    case FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
