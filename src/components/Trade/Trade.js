import React, { Component } from "react";
import { connect } from "react-redux";

import { buyCurrencyRequest, sellCurrencyRequest} from "../../actions/currency";
import { fetchCashRequest } from "../../actions/cash";
import {
	getCurrentBtcPurchase,
	getCurrentBtcSell,
	getCurrentEthPurchase,
	getCurrentEthSell,
	getSelected
} from "../../ducks/currency";

import { getCashBtc, getCashEth, getCashUsd, getCashError } from "../../ducks/cash";

import "./Trade.css"

class Trade extends Component {
	state = {
		btc: this.props.cashBtc,
		eth: this.props.cashEth,
		usd: this.props.cashUsd,
		inputItem: 1,
		currentInput: "inputItem",
		inputSell: this.props.sell,
		inputPurchase: this.props.purchase,

	};

	getDecimal = num => {
		let str = "" + num;
		let zero = str.indexOf(".");

		if (zero === -1) return 0;
		str = str.slice(zero + 1);
		return str;
	};

	componentDidMount() {
		this.props.fetchCashRequest();
	}

	componentWillReceiveProps(nextProps) {
		const { cashUsd, cashBtc, cashEth, sell, purchase } = nextProps;
		const { currentInput } = this.state;
		this.changeInputs(currentInput, sell, purchase);
		this.setState({
			btc: cashBtc,
			eth: cashEth,
			usd: cashUsd,
		});
	}
	onInputChange = event => {
		const { name, value } = event.target;
		const { sell, purchase } = this.props;

		this.setState(state => ({ [name]: value }));
		if (isNaN(event.target.value) || event.target.value === "") {
			return;
		} else this.changeInputs(event.target.name, sell, purchase);
	};

	onInputFocus = (e) => {
		this.setState({ currentInput: e.target.name });
	};

	onInputBlur = () => {
		this.setState({ currentInput: "inputItem" });
	};

	handleBuy = () => {
		const { currencyItem } = this.props;
		const { inputItem } = this.state;
		this.props.buyCurrencyRequest({ currencyItem, value: inputItem });
	};


	handleSell = () => {
		const { currencyItem } = this.props;
		const { inputItem } = this.state;
		this.props.sellCurrencyRequest({ currencyItem, value: inputItem });
	};

	changeInputs(name, sell, purchase) {
		switch (name) {
			case "inputItem": {
				this.setState(({ inputItem }) => {
					const parsed = isNaN(inputItem) ? 0 : parseFloat(inputItem);
					return {
						inputSell: parsed * sell,
						inputPurchase: parsed * purchase
					};
				});
				break;
			}
			case "inputSell":
				this.setState(({ inputSell }) => {
					const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
					const nextItem = parsedSell / sell;
					return {
						inputItem: nextItem,
						inputPurchase: nextItem * purchase
					};
				});
				break;
			case "inputPurchase":
				this.setState(({ inputPurchase }) => {
					const parsedPurchase = isNaN(inputPurchase) ? 0 : parseFloat(inputPurchase);
					const nextItem = parsedPurchase / purchase;
					return {
						inputItem: nextItem,
						inputSell: nextItem * sell
					};
				});
				break;
			default:
				break;
		}
	}

	render() {

		const { cashError, currencyItem } = this.props;
		const { inputItem, inputSell, inputPurchase } = this.state;

		const currencies = ["btc", "eth", "usd" ].map(item => (
			<div key={ item }>
				<div>
					<span>{ Math.floor(this.state[item]) + "." }</span>
					<span>{ this.getDecimal(this.state[item]) }</span>
				</div>
				{ item.toUpperCase() }
			</div>
		));

		return(
			<section className="sec trade-sec">
				<div>
					<h2>Ваш счет</h2>
					{ currencies }
				</div>
				<h2>Покупка/продажа</h2>
				<div>
					<input
						name="inputItem"
						value={ inputItem }
						onChange={ this.onInputChange }
						onFocus={ this.onInputFocus }
						onBlur={ this.onInputBlur } />
					<span>{currencyItem.toUpperCase()}</span>
				</div>
				<div>
					<div>
						<input
							name="inputPurchase"
							value={inputPurchase}
							onChange={ this.onInputChange }
							onFocus={ this.onInputFocus }
							onBlur={ this.onInputBlur } />
						<span>$</span>
					</div>
					<button onClick={ this.handleSell }>Продать</button>
				</div>
				<div>
					<div>
						<input
							name="inputSell"
							value={inputSell}
							onChange={ this.handleChange }
							onFocus={ this.handleFocus }
							onBlur={ this.handleBlur } />
						<span>$</span>
					</div>
					<button onClick={ this.handleBuy }>Купить</button>
				</div>
				{cashError && <p style={{ color: "red" }}>{cashError}</p>}
			</section>
		)
	};
};

const mapStateToProps = state => ({
	cashBtc: getCashBtc(state),
	cashEth: getCashEth(state),
	cashUsd: getCashUsd(state),
	cashError: getCashError(state),
	sell: getSelected(state) === 'btc' ? getCurrentBtcSell(state) : getCurrentEthSell(state),
	purchase: getSelected(state) === 'btc' ? getCurrentBtcPurchase(state) : getCurrentEthPurchase(state),
	currencyItem: getSelected(state)
});

const mapDispatchToProps = {
	fetchCashRequest,
	buyCurrencyRequest,
	sellCurrencyRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
