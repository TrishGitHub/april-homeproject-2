import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "../Layout/Header";
// import Footer from "../Layout/Footer";
import Canvas from "../Canvas/Canvas";

import './UserPage.css';


const InnerContent = styled.section`
    width: 80%;
    height: 100%;
    margin: auto;
    background: #fff;
`;

class UserPage extends PureComponent {

	render() {
		return (
			<div className="page-inner">
				<Canvas/>
				<Header />
				<InnerContent />
				{/*<Footer />*/}
			</div>
		);
	}
}

export default withRouter(
	connect(null, null)(UserPage)
);