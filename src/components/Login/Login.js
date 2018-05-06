import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './Login.css';

class Login extends PureComponent {

	render() {
		return (
			<div className="login">
				<h1>Login Page</h1>
			</div>
		)
	}
}

export default connect(null, null)(Login);
