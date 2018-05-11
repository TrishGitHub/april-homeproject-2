import { takeLatest, put, call } from "redux-saga/effects";
import {
	buyCurrencyRequest,
	buyCurrencySuccess,
	buyCurrencyFailure,
	sellCurrencyRequest,
	sellCurrencySuccess,
	sellCurrencyFailure
} from "../actions/currency";
import { fetchCashRequest, fetchCashSuccess, fetchCashFailure} from "../actions/cash";

import { buyCurrency, sellCurrency, getCash } from "../api";

export function* byuCurrencyFlow(action) {
	try {
		const result = yield call(
			buyCurrency,
			action.payload.currencyItem,
			action.payload.value
		);
		yield put(buyCurrencySuccess(result));
	} catch (error) {
		yield put(buyCurrencyFailure(error));
	}
}

export function* sellCurrencyFlow(action) {
	try {
		const result = yield call(
			sellCurrency,
			action.payload.currencyItem,
			action.payload.value
		);
		yield put(sellCurrencySuccess(result));
	} catch (error) {
		yield put(sellCurrencyFailure(error));
	}
}

export function* cashFlow() {
	try {
		const result = yield call(getCash);
		yield put(fetchCashSuccess(result));
	} catch (error) {
		yield put(fetchCashFailure(error));
	}
}

export function* buyWatch() {
	yield takeLatest(buyCurrencyRequest, byuCurrencyFlow);
}

export function* sellWatch() {
	yield takeLatest(sellCurrencyRequest, sellCurrencyFlow);
}

export function* cashWatch() {
	yield takeLatest(fetchCashRequest, cashFlow);
}
