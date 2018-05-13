import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { getSelected } from "../../ducks/currency";
import { selectOffset } from "../../actions/currency";

import BtcItem from "././BtcItem";
import EthItem from "././EthItem";

import './History.css';

export class History extends PureComponent {
	render() {

		const { selected } = this.props;

		return (
			<section className="history">
				<h2 className="sec-ttl">История операций</h2>
				<div className="history-wrap">
					<table>
						{  selected === "btc" ? (
								<Fragment>
									<thead>
										<tr>
											<td>Операция</td>
											<td>Дата</td>
											<td>BTC</td>
										</tr>
									</thead>
									<tbody>
										<BtcItem />
									</tbody>
								</Fragment>
							): (
								<Fragment>
									<thead>
									<tr>
										<td>Операция</td>
										<td>Дата</td>
										<td>ETH</td>
									</tr>
									</thead>
									<tbody>
										<EthItem />
									</tbody>
								</Fragment>
							)
						}
					</table>
					<footer className="history-pagination">
					</footer>
				</div>
			</section>
		);
	}
};


const mapStateToProps = state => ({
	selected: getSelected(state)
});

const mapDispatchToProps = {
	selectOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
