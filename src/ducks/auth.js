import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	authLogSuccess,
	authLogFailure,
	authRegSuccess,
	authRegFailure,
	logout
} from "../actions/auth";

export const logError = handleActions(
	{
		[authLogSuccess]: () => null,
		[authRegSuccess]: () => null,
		[authLogFailure]: (state, action) => action.payload
	},
	null
);

export const regError = handleActions(
	{
		[authLogSuccess]: () => null,
		[authRegSuccess]: () => null,
		[authRegFailure]: (state, action) => action.payload
	},
	null
);

export const isAuthorized = handleActions(
	{
		[authLogSuccess]: () => true,
		[authRegSuccess]: () => true,
		[logout]: () => false
	},
	false
);

export default combineReducers({
	logError,
	regError,
	isAuthorized,
});

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLogError = state => state.auth.logError;
export const getRegError = state => state.auth.regError;