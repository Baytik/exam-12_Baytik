import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_ERROR = 'FETCH_GALLERIES_ERROR';
export const FETCH_USERS_GALLERIES_SUCCESS = 'FETCH_USERS_GALLERIES_SUCCESS';
export const FETCH_USERS_GALLERIES_ERROR = 'FETCH_USERS_GALLERIES_ERROR';

export const POST_GALLERY_ERROR = 'POST_GALLERY_ERROR';
export const DELETE_GALLERY_ERROR = 'DELETE_GALLERY_ERROR';

export const fetchGalleriesSuccess = (galleries) => ({type: FETCH_GALLERIES_SUCCESS, galleries});
export const fetchGalleriesError = (error) => ({type: FETCH_GALLERIES_ERROR, error});
export const fetchUsersGalleriesSuccess = (usersGalleries) => ({type: FETCH_USERS_GALLERIES_SUCCESS, usersGalleries});
export const fetchUsersGalleriesError = (error) => ({type: FETCH_USERS_GALLERIES_ERROR, error});

export const postGalleryError = (error) => ({type: POST_GALLERY_ERROR, error});
export const deleteGalleryError = (error) => ({type: DELETE_GALLERY_ERROR, error});

export const fetchGalleries = () => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get('/galleries');
            dispatch(fetchGalleriesSuccess(response.data));
        } catch (error) {
            dispatch(fetchGalleriesError(error))
        }
    }
};

export const fetchUsersGalleries = (id) => {
  return async (dispatch) => {
      try {
          const response = await axiosAPI.get(`/galleries/${id}`);
          dispatch(fetchUsersGalleriesSuccess(response.data))
      } catch (error) {
          fetchUsersGalleriesError(error)
      }
  }
};

export const postGallery = (gallery) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/galleries', gallery, {headers: {'Authorization': token.token}});
            dispatch(push('/'))
        } catch (error) {
            dispatch(postGalleryError(error))
        }
    }
};

export const deleteGallery = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.delete(`/galleries/${id}`, {headers: {'Authorization': token.token}});
            dispatch(fetchUsersGalleries(id));
        } catch (error) {
            dispatch(deleteGalleryError(error));
            dispatch(fetchUsersGalleries(id));
        }
    }
};
