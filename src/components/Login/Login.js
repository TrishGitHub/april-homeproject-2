import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { authLogRequest, authRegRequest } from "../../actions/auth";
import { getLogError, getRegError } from "../../ducks/auth";

import Canvas from "../Canvas/Canvas";

import './Login.css';

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		errors: { email: '', password: '' },
		isAuthorized: true,
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
		const { isAuthorized, email, password } = this.state;
		isAuthorized ? this.props.authLogRequest({ email, password }) : this.props.authRegRequest({ email, password });
	};

	handleChangeForm = (e) => {
		e.preventDefault();
		const { isAuthorized } = this.state;
		this.setState({ isAuthorized: !isAuthorized });
	};


 	render() {
	    const { email, password, isAuthorized } = this.state;
	    const { logError, regError } = this.props;

		return (
			<div className="content login-page">
				<Canvas/>
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
							{ logError || regError ? (
								<Fragment>
									{(logError && <span className="error">{ logError }</span>) ||
									(regError &&
									Object.keys(regError).map(type => (
										<span className="error" key={ type }>{`${ type }: ${ regError[type]}`}</span>
									)))}
								</Fragment>
							) : null}
							<button className="btn" onClick= { this.handleSubmit }>
								{ isAuthorized? "Войти": "Регистрация" }
							</button>
						</div>
						<div className="login-bottom">
							{isAuthorized ? (
								<div className="login-txt">
									Впервые на сайте?
									<button className="link" onClick= { this.handleChangeForm }>
											Регистрация
									</button>
								</div>
								) : (
									<div className="login-txt">
										Уже зарегистрированы?{" "}
										<button className="link" onClick= { this.handleChangeForm }>
											Войти
										</button>
									</div>
							)}
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	logError: getLogError(state),
	regError: getRegError(state)
});

const mapDispatchToProps = {
	authLogRequest,
	authRegRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
