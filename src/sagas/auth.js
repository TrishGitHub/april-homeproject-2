import { select, call, put, take } from "redux-saga/effects";
import { setTokenApi, clearTokenApi } from "../api";
import { authLogSuccess, authRegSuccess, logout } from "../actions/auth";
import { getIsAuthorized } from "../ducks/auth";
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from "../localStorage";

export function* authFlow() {
	while (true) {
		const isAuthorized = yield select(getIsAuthorized);
		const localStorageToken = yield call(getTokenFromLocalStorage);
		let token;

		if (!isAuthorized && localStorageToken) {
			token = localStorageToken;
			yield put(authLogSuccess());
		} else {
			const action = yield take([authLogSuccess, authRegSuccess]);
			token = action.payload;
		}
		yield call(setTokenApi, token);
		yield call(setTokenToLocalStorage, token);

		yield take(logout);

		yield call(removeTokenFromLocalStorage);
		yield call(clearTokenApi);
	}
}