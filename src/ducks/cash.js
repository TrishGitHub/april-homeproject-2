import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

import { fetchCashRequest, fetchCashSuccess, fetchCashFailure } from "../actions/cash";
import { buyCurrencySuccess, buyCurrencyFailure, sellCurrencySuccess, sellCurrencyFailure } from "../actions/currency";

export const btc = handleActions(
	{
		[fetchCashSuccess]: (state, action) => action.payload.data.result.btc,
		[buyCurrencySuccess]: (state, action) => action.payload.data.btc,
		[sellCurrencySuccess]: (state, action) => action.payload.data.btc
	},
	0
);
export const eth = handleActions(
	{
		[fetchCashSuccess]: (state, action) => action.payload.data.result.eth,
		[buyCurrencySuccess]: (state, action) => action.payload.data.eth,
		[sellCurrencySuccess]: (state, action) => action.payload.data.eth
	},
	0
);
export const usd = handleActions(
	{
		[fetchCashSuccess]: (state, action) => action.payload.data.result.usd,
		[buyCurrencySuccess]: (state, action) => action.payload.data.usd,
		[sellCurrencySuccess]: (state, action) => action.payload.data.usd
	},
	10000
);

export const isLoading = handleActions(
	{
		[fetchCashRequest]: () => true,
		[fetchCashSuccess]: () => false,
		[fetchCashFailure]: () => false
	},
	false
);

export const error = handleActions(
	{
		[fetchCashRequest]: () => null,
		[fetchCashSuccess]: () => null,
		[fetchCashFailure]: (state, action) => action.payload,
		[buyCurrencyFailure]: (state, action) => action.payload,
		[sellCurrencyFailure]: (state, action) => action.payload
	},
	null
);



export const money = combineReducers({
	btc,
	eth,
	usd
});

export default combineReducers({
	isLoading,
	money,
	error
});

export const getCashBtc = state => state.cash.money.btc;
export const getCashEth = state => state.cash.money.eth;
export const getCashUsd = state => state.cash.money.usd;
export const getCashError = state => state.cash.error;

