import { authFlow } from "../auth";
import { select, call, take, put } from "redux-saga/effects";
import { setTokenApi, clearTokenApi } from "../../api";

import { authLogSuccess, authRegSuccess, logout } from "../../actions/auth";
import { getIsAuthorized } from "../../ducks/auth";
import {
	getTokenFromLocalStorage,
	setTokenToLocalStorage,
	removeTokenFromLocalStorage
} from "../../localStorage";


describe("Saga authFlow testing", () => {
	const saga = authFlow();
	const token = 123;

	describe("Сценарий авторизации в localstorage без токена", () => {

		it("1. Эфект select getIsAuthorized", () => {
			expect(saga.next().value).toEqual(select(getIsAuthorized));
		});

		it("2. Эфект call getTokenFromLocalStorage", () => {
			expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
		});

		it("3. Эфект take с ожиданием authLoginSuccess/authRegSuccess ", () => {
			expect(saga.next().value).toEqual(take([authLogSuccess, authRegSuccess]));
		});

		it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
			expect(saga.next({ payload: token }).value).toEqual( call(setTokenApi, token));
		});

		it("5. Эфект call setTokenToLocalStorage", () => {
			expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
		});

		it("6. Эфект take logout", () => {
			expect(saga.next().value).toEqual(take(logout));
		});

		it("7. Эфект call removeTokenFromLocalStorage", () => {
			expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
		});

		it("8. Эфект call clearTokenApi", () => {
			expect(saga.next().value).toEqual(call(clearTokenApi));
		});
	});

	describe("Сценарий авторизации из localstorage c токеном", () => {
		const localStorageToken = 123;

		it("1. Эфект select getIsAuthorized", () => {
			expect(saga.next().value).toEqual(select(getIsAuthorized));
		});
		it("2. Эфект call getTokenFromLocalStorage", () => {
			expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
		});
		it("3. Эфект put(authLogSuccess())", () => {
			expect(saga.next(localStorageToken).value).toEqual(put(authLogSuccess()));
		});
		it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
			expect(saga.next({ payload: token }).value).toEqual( call(setTokenApi, token));
		});

		it("5. Эфект call setTokenToLocalStorage", () => {
			expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
		});
		it("6. Эфект take logout", () => {
			expect(saga.next().value).toEqual(take(logout));
		});

		it("7. Эфект call removeTokenFromLocalStorage", () => {
			expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
		});

		it("8. Эфект call clearTokenApi", () => {
			expect(saga.next().value).toEqual(call(clearTokenApi));
		});
	});
});
