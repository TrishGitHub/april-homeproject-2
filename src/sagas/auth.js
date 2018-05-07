import { setTokenApi, clearTokenApi } from "../api";
import { authorize, logout } from "../actions/auth";
import { select, call, put, take } from "redux-saga/effects";
import { getIsAuthorized } from "../ducks/auth";
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from "../localStorage";

export function* authFlow() {
	while (true) {
		const isAuthorized = yield select(getIsAuthorized);
		const localStorageToken = yield call(getTokenFromLocalStorage);
		let token;

		if (!isAuthorized && localStorageToken) {
			token = localStorageToken;
			yield put(authorize());
		} else {
			const action = yield take(authorize);
			token = action.payload;
		}
		yield call(setTokenApi, token);
		yield call(setTokenToLocalStorage, token);

		yield take(logout);

		yield call(removeTokenFromLocalStorage);
		yield call(clearTokenApi);
	}
}