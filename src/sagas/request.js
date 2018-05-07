import { call, select, put } from "redux-saga/effects";

import { clearNetworkErrors, networkError } from "../actions/network";
import { logout } from "../actions/auth";
import { getNetworkErrors } from "../ducks/network";

export default function* requestFlow(func, arg) {
	try {
		const response = yield call(func, arg);
		if (yield select(getNetworkErrors)) yield put(clearNetworkErrors());
		return response;
	} catch (error) {
		yield put(networkError(error));
		if (error.response.status === 401) yield put(logout());
		throw error;
	}
}


