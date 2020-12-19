import {
  FETCH_SUCCESS,
  SET_PHOTOS,
  FETCH_REQUEST,
  FETCH_ERROR,
} from "../actionsTypes";

const initialState = {
  isLoading: false,
  photos: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: action.data };
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
