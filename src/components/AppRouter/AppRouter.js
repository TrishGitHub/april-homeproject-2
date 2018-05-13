import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "../Login";
import UserPage from "../UserPage";
import PrivateRoute from "../PrivateRoute";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../ducks/auth";

export class AppRouter extends Component {
  render() {
    const { isAuthorized } = this.props;
    return (
      <Switch>
        <PrivateRoute path="/trade/:currency" component={UserPage} />
        {!isAuthorized && <Route path="/*" component={Login} />}
        <Redirect to="/trade/btc" />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

export default withRouter(connect(mapStateToProps)(AppRouter));
