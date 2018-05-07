import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { logWatch, regWatch } from "./login";

export default function*() {
	yield fork(authFlow);
	yield fork(logWatch);
	yield fork(regWatch);
}