import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { purchaseBtc, sellBtc } from "../../../ducks/currency";

export class BtcItem extends PureComponent {
	render(){
		const moment = require('moment');
		const { purchaseBtc, sellBtc } = this.props;

		return(
			<Fragment>
				{ purchaseBtc.map(([date, value]) =>
					(
						<tr key={ date.toString() }>
							<td>Продажа</td>
							<td>{ moment(date).format('DD.MM.YY HH:mm')}</td>
							<td>{ value }</td>
						</tr>
					))
				}
				{ sellBtc.map(([date, value ]) => (
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
	purchaseBtc: purchaseBtc(state),
	sellBtc: sellBtc(state),
});

export default connect(mapStateToProps, null)(BtcItem);