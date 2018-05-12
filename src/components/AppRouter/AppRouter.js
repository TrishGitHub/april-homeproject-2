import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import UserPage from '../UserPage/';

import { getIsAuthorized } from "../../ducks/auth";
import { getNetworkErrors, getErrorMessage } from "../../ducks/network";

class AppRouter extends Component {

	render() {
		const { error, message, isAuthorized } = this.props;

		return (
            <div className="content">
				{error && <div className="error">{ message }</div>}

                <Switch>
                    <PrivateRoute path="/trade"
                                  component={ UserPage }/>
					{ !isAuthorized && <Route path="/*" component={ Login } />}
                    <Redirect to="/trade" />
                </Switch>
            </div>
		);
	};
}

const mapStateToProps = state => ({
	error: getNetworkErrors(state),
	message: getErrorMessage(state),
	isAuthorized: getIsAuthorized(state),
});

export default withRouter(
	connect(mapStateToProps, null)(AppRouter)
);