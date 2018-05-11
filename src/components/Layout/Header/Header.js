import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import { selectBtc, selectEth } from "../../../actions/currency";
import { logout } from "../../../actions/auth";
import { fetchUserInfoRequest } from "../../../actions/user";
import { getCurrentBtcSell, getCurrentEthSell } from "../../../ducks/currency";
import { getUserEmail } from "../../../ducks/user";

import './Header.css';

const CurrencyLink = styled(Link)`
	width: 140px;
	height: 80px;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	justify-content: center;
	text-decoration: none;
	text-align: center;
	margin-right: 20px;
	background-color: #404243;
	color: ${props => (props.className === "active" ? "#fff" : "#c3c3c3")};
	&:hover {
	color: #fff;
}`;

class Header extends Component {
	state = {
		btc: 0,
		eth: 0
	};

	componentDidMount() {
		const link = this.props.match.params.currency;
		this.setCurrency(link);
		this.props.fetchUserInfoRequest();
	}

	componentWillReceiveProps(nextProps) {
		const link = this.props.match.params.currency;
		const nextLink = nextProps.match.params.currency;
		if (link && link !== nextLink) {
			this.setCurrency(nextLink);
		}
		this.getCurrencyValue(nextProps);
	}

	getCurrencyValue = (props) => {
		const { Btc, Eth } = props;
		this.setState({ Btc: Math.round(Btc) });
		this.setState({ Eth: Math.round(Eth) });
	};

	setCurrency = (link) => {
		const { selectBtc, selectEth } = this.props;
		if (link === "btc") {
			selectBtc();
		} else {
			selectEth();
		}
	};

	handleLogout = () => {
		this.props.logout();
	};

	render() {
		const currency = this.props.match.params.currency;
		const { userEmail } = this.props;

		return (
			<div className="header">
				<div className="container">
					<img src="/images/Logo-white.svg" className="logo" alt="J-Traiding logo"/>

					<CurrencyLink
						className={currency === "btc" ? "active" : null}
						to="/trade/btc" >
						<b>{ this.state.btc }</b>
						<b>1 BTC</b>
					</CurrencyLink>

					<CurrencyLink
						className={currency === "eth" ? "active" : null}
						to="/trade/eth" >
						<b>{this.state.Eth}</b>
						<b>1 ETH</b>
					</CurrencyLink>

					<div>{ userEmail }</div>
					<button className="btn btn-small" onClick= { this.handleLogout }>
						Выйти
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	btc: getCurrentBtcSell(state),
	eth: getCurrentEthSell(state),
	userEmail: getUserEmail(state)
});

const mapDispatchToProps = {
	selectBtc,
	selectEth,
	fetchUserInfoRequest,
	logout
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Header)
);
