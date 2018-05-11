import { createActions } from "redux-actions";

export const {
	fetchCashRequest,
	fetchCashSuccess,
	fetchCashFailure
} = createActions(
	"FETCH_CASH_REQUEST",
	"FETCH_CASH_SUCCESS",
	"FETCH_CASH_FAILURE"
);
