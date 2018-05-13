import {
  authLogRequest,
  authLogSuccess,
  authLogFailure,

  authRegRequest,
  authRegSuccess,
  authRegFailure
} from "../actions/auth";
import { takeLatest, put, call } from "redux-saga/effects";
import { login, registration } from "../api";

export function* registrationFlow(action) {
  try {
    const result = yield call(registration, action.payload);
    yield put(authRegSuccess(result.data.jwt));
  } catch (error) {
    yield put(authRegFailure(error.data.message));
  }
}

export function* loginFlow(action) {
  try {
    const result = yield call(login, action.payload);
    yield put(authLogSuccess(result.data.jwt));
  } catch (error) {
    yield put(authLogFailure(error.data.message));
  }
}

export function* registrationWatch() {
  yield takeLatest(authRegRequest, registrationFlow);
}

export function* loginWatch() {
  yield takeLatest(authLogRequest, loginFlow);
}
