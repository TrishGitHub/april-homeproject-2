import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Footer.css"

class Footer extends Component {
	render() {
		return(
			<div className="footer">
				<div className="container">
					<img src="/images/Logo-white.svg" className="logo" alt="J-Traiding logo"/>
				</div>
			</div>
		);
	}
}


export default withRouter(
	connect(null, null)(Footer)
);
