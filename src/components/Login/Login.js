import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Particles from "react-particles-js";
import particlesParams from "./particles-params";

import './Login.css';

class Login extends PureComponent {
	render() {
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
								<input className="form-field" type="text" name="login" id="login" placeholder="login"/>
							</form-group>
							<form-group>
								<i className="field-ico ico-pass"></i>
								<input className="form-field" type="text" name="password" id="password" placeholder="password"/>
							</form-group>
							<input className="btn" type="submit" value="Войти"/>
						</div>
						<div className="login-bottom">
							<p className="login-txt">
								Впервые на сайте?
							</p>
							<a href="/registration">Регистрация</a>
						</div>
					</form>


				</div>
			</div>
		)
	}
}

export default connect(null, null)(Login);
