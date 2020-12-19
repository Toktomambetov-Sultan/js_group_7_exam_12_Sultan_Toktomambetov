import { push } from "connected-react-router";
import axiosOrder from "../../axiosOrder";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  SET_CURRENT_USER,
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

const setCurrentUser = (data) => {
  return { type: SET_CURRENT_USER, data };
};

export const getPhotos = (id) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get(
        id ? "/photos?id=" + id : "/photos"
      );
      dispatch(setPhotos(response.data.photos));
      dispatch(setCurrentUser(response.data.user));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

export const postPhoto = (data) => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      await axiosOrder.post("/photos/", formData, { headers });
      dispatch(push("/gallery"));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error.response.data));
    }
  };
};

export const deletePhoto = (id) => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.delete("/photos", {
        data: { id },
        headers,
      });

      dispatch(push("/gallery"));
      dispatch(fetchSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error));
    }
  };
};
