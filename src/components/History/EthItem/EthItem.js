import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { purchaseEth, sellEth } from "../../../ducks/currency";

export class EthItem extends PureComponent {
	render(){
		const moment = require('moment');
		const { purchaseEth, sellEth } = this.props;

		return(
			<Fragment>
				{ purchaseEth.map(([date, value]) =>
					(
						<tr key={ date.toString() }>
							<td>Продажа</td>
							<td>{ moment(date).format('DD.MM.YY HH:mm')}</td>
							<td>{ value }</td>
						</tr>
					))
				}
				{ sellEth.map(([date, value ]) => (
						<tr key={ date.toString()}>
							<td>Покупка</td>
							<td>{ moment(date).format('DD.MM.YY HH:mm')}</td>
							<td>{ value }</td>
						</tr>
					))
				}
			</Fragment>
		)
	};
}

const mapStateToProps = state => ({
	purchaseEth: purchaseEth(state),
	sellEth: sellEth(state),
});

export default connect(mapStateToProps, null)(EthItem);