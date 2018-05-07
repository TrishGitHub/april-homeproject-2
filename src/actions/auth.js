import { createActions } from 'redux-actions';

export const {
	authLogRequest, authLogSuccess, authLogFailure,
	authRegRequest, authRegSuccess, authRegFailure,
	logout
} = createActions(
	"AUTH_LOG_REQUEST",
	"AUTH_LOG_SUCCESS",
	"AUTH_LOG_FAILURE",
	"AUTH_REG_REQUEST",
	"AUTH_REG_SUCCESS",
	"AUTH_REG_FAILURE",
	"LOGOUT"
);
