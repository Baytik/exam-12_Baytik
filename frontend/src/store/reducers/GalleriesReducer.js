import {FETCH_GALLERIES_SUCCESS, FETCH_USERS_GALLERIES_SUCCESS} from "../actions/GalleriesAction";

const initialState = {
    galleries: [],
    usersGalleries: []
};

const GalleriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GALLERIES_SUCCESS:
            return {...state, galleries: action.galleries};
        case FETCH_USERS_GALLERIES_SUCCESS:
            return {...state, usersGalleries: action.usersGalleries};
        default:
            return state;
    }
};

export default GalleriesReducer;