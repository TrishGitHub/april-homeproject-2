import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/auth";

import './UserPage.css';

class UserPage extends PureComponent {

	handleLogout = () => {
		this.props.logout();
	};

	render() {
		return (
			<Fragment>
				<h1>Private Page</h1>
				<button className="btn btn-small" onClick= { this.handleLogout }>
					Выйти
				</button>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
	logout
};

export default withRouter(
	connect(null, mapDispatchToProps)(UserPage)
);