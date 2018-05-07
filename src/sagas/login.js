import { call, put, takeLatest } from "redux-saga/effects";
import { login, registration } from "../api";
import {
	authLogRequest,
	authLogSuccess,
	authLogFailure,
	authRegRequest,
	authRegSuccess,
	authRegFailure
} from "../actions/auth";

export function* logFlow(action) {
	try {
		const result = yield call(login, action.payload);
		yield put(authLogSuccess(result.data.jwt));
	} catch (error) {
		yield put(authLogFailure(error.data.message));
	}
}

export function* regFlow(action) {
	try {
		const result = yield call(registration, action.payload);
		yield put(authRegSuccess(result.data.jwt));
	} catch (error) {
		yield put(authRegFailure(error.data.message));
	}
}

export function* logWatch() {
	yield takeLatest(authLogRequest, logFlow);
}

export function* regWatch() {
	yield takeLatest(authRegRequest, regFlow);
}