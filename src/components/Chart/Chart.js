import React, { Component } from "react";
import { connect } from "react-redux";
import {LineChart} from 'react-easy-chart';
import styled from "styled-components";
import Spinner from 'react-svg-spinner';

import {
	getIsBtcLoading,
	getIsEthLoading,
	purchaseBtc,
	sellBtc,
	purchaseEth,
	sellEth,
	getOffset,
	getSelected,
} from "../../ducks/currency";

import { selectOffset } from "../../actions/currency";

import "./Chart.css"

const offsets = {
	'2h': '2ч',
	'4h': '4ч',
	'8h': '8ч',
	'1d': 'день',
	'7d': 'неделя',
};

const Tab = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  font-weight: 500;
  border: none;
  background-color: ${props => (props.active ? "#4db6e2" : "inherit")};
  color: ${props => (props.active ? "#fff" : "#958b94")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4db6e2;
    color: #fff;
  }
`;

class Chart extends Component {

	handleClick = e => {
		const { selectOffset } = this.props;
		selectOffset(e.target.dataset.name);
	};

	render(){
		const moment = require('moment');
		let currentTime = moment(new Date()).format('HH:mm');

		const {
			purchaseBtc,
			purchaseEth,
			sellBtc,
			sellEth,
			isEthLoading,
			isBtcLoading,
			selected,
			offset,
		} = this.props;

		const tabs = Object.keys(offsets).map(item => (
			<Tab
				onClick={this.handleClick}
				key={ item }
				data-name={ item }
				active={offset === item ? true : false} >
				{offsets[item]}
			</Tab>
		));
		return(
			<section className="sec chart-sec">
				<h2 className="sec-ttl">Окно графика</h2>
				<div className="chart-top">
					<p className="time-ttl">Время:
						<span className="time"> { currentTime }</span>
					</p>
					<div className="tabs-wrap">
						{ tabs }
					</div>
				</div>

				{isEthLoading || isBtcLoading ? (
					<div className="chart-wrap">
						<Spinner classname="loader"
								size="50px"
								color="#4db6e2"
								thickness={ 2 }
								gap={ 2 } />
					</div>
				) : (
					<div className="chart-wrap">
						{selected === "btc" ? (
							<LineChart
								lineColors={['blue', 'red']}
								axes
								grid
								verticalGrid
								interpolate={'cardinal'}
								xType={'time'}
								datePattern={'%d-%m %H:%M'}
								width={600}
								height={400}
								style={{
									'.axis path': {
										stroke: '#EDF0F1',
									},
								}}
								data={[
									sellBtc.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
									purchaseBtc.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
								]}
							/>
						) : (
							<LineChart
								lineColors={['blue', 'red']}
								axes
								grid
								verticalGrid
								interpolate={'cardinal'}
								xType={'time'}
								datePattern={'%d-%m %H:%M'}
								width={600}
								height={400}
								style={{
									'.axis path': {
										stroke: '#EDF0F1',
									},
								}}
								data={[
									sellEth.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
									purchaseEth.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
								]}
							/>
						)}
					</div>
				)}
			</section>
		)
	};
}

const mapStateToProps = state => ({
	purchaseBtc: purchaseBtc(state),
	purchaseEth: purchaseEth(state),
	sellBtc: sellBtc(state),
	sellEth: sellEth(state),
	isBtcLoading: getIsBtcLoading(state),
	isEthLoading: getIsEthLoading(state),
	offset: getOffset(state),
	selected: getSelected(state)
});

const mapDispatchToProps = {
	selectOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
