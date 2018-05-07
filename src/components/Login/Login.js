import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { authorize } from "../../actions/auth";

import Particles from "react-particles-js";
import particlesParams from "./particles-params";

import './Login.css';

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		errors: { email: '', password: '' },
		isAuthorized: false,
		isEmailValid: false,
		isPassValid: false,
	};

	handleChangeField = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	};

	validateField(field, val) {
		let errors = this.state.errors;
		let isEmailValid = this.state.isEmailValid;
		let isPassValid = this.state.isPassValid;

		switch (field) {
			case 'email':
				isEmailValid = val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				errors.email = isEmailValid ? '' : ' is invalid';
				break;

			case 'password':
				isPassValid = val.length >= 4;
				errors.password = isPassValid ? '' : ' must be at least 4 characters long';
				break;

			default:
		}

		this.setState({
			errors: errors,
			isEmailValid: isEmailValid,
			isPassValid: isPassValid,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState( ({ isAuthorized }) => ({ isAuthorized: !isAuthorized }));
	};

 	render() {
	    const { email, password, isAuthorized } = this.state;

		return (
			<div className="content login-page">
				<Particles
					params={particlesParams}
					style={{ position: "absolute", top: 0, left: 0, zIndex: -1,}}
				/>
				<div className="login-wrap">
					<img src="/images/Logo.svg" className="logo" alt="J-Traiding logo"/>
					<form className="form" >
						<div className="login-top">
							<form-group>
								<i className="field-ico ico-login"></i>
								<input className="form-field" type="text" name="email" id="email" placeholder="login"
								       value= { email }
								       onChange={ this.handleChangeField}
								/>
							</form-group>
							<form-group>
								<i className="field-ico ico-pass"></i>
								<input className="form-field" type="text" name="password" id="password" placeholder="password"
								       value= { password }
								       onChange = { this.handleChangeField }
								/>
							</form-group>
							<button className="btn" onClick= { this.handleSubmit }>
								{ isAuthorized? "Регистрация": "Войти" }
							</button>
						</div>
						<div className="login-bottom">
							<p className="login-txt">
								Впервые на сайте?
							</p>
							<button className="link" onClick= { this.handleSubmit }>
								{ isAuthorized? "Войти": "Регистрация" }
							</button>
						</div>
					</form>


				</div>
			</div>
		)
	}
}

const mapDispatchToProps = {
	authorize
};

export default connect(null, mapDispatchToProps)(Login);
