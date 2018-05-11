import { combineReducers } from 'redux';

import auth from './auth';
import network from './network';
import user from './user';
import currency from './currency';
import cash from './currency';

export default combineReducers({
	auth,
	network,
	user,
	currency,
	cash,
});
