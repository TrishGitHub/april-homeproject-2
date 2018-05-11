import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Footer.css"

class Footer extends Component {
	render() {
		return(
			<div className="footer">
				<div className="container">
					<p className="copy">
						Сделано с любовью и старанием
						на курсе «React.js» в <a class="link" href="https://loftschool.com/" target="_blank" rel="noopener noreferrer">LoftSchool.</a>
						Автор работы: <span class="color">Ира Нощенко</span>
					</p>
					<img src="/images/Logo-white.svg" className="logo" alt="J-Traiding logo"/>
				</div>
			</div>
		);
	}
}


export default withRouter(
	connect(null, null)(Footer)
);
