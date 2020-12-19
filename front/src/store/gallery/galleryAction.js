import axiosOrder from "../../axiosOrder";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  SET_PHOTOS,
} from "../actionsTypes";

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};
const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};

const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};

const setPhotos = (data) => {
  return { type: SET_PHOTOS, data };
};

export const getPhotos = () => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get("/photos");
      dispatch(setPhotos(response.data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
