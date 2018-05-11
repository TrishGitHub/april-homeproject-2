import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { logWatch, regWatch } from "./login";
import { userInfoWatch } from "./user";
import { fetchBtcWatch, fetchEthWatch, currencyWatch } from "./currency";
import { buyWatch, sellWatch, cashWatch, cashFlow } from "./cash";

export default function*() {
	yield fork(authFlow);
	yield fork(logWatch);
	yield fork(regWatch);
	yield fork(fetchEthWatch);
	yield fork(fetchBtcWatch);
	yield fork(currencyWatch);
	yield fork(buyWatch);
	yield fork(sellWatch);
	yield fork(cashFlow);
	yield fork(cashWatch);
	yield fork(userInfoWatch);
}