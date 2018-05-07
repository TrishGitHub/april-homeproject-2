import { handleActions } from "redux-actions";
import { authorize, logout } from "../actions/auth";

export default handleActions(
	{
		[authorize]: (state, action) => ({
			...state,
			isAutorized: true,
		}),

		[logout]: (state, action) => ({
			...state,
			isAutorized: false,
		})
	},
	{ isAutorized: false }
);

export const getIsAuthorized = state => state.auth.isAutorized;