import { handleAction } from "redux-actions";
import { combineReducers } from "redux";

import { fetchUserInfoSuccess } from "../actions/user";

export const email = handleAction(
	fetchUserInfoSuccess,
	(state, action) => action.payload.data.result.email, ''
);

export default combineReducers({
	email
});

export const getUserEmail = state => state.user.email;
