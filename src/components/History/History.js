import React, {PureComponent} from 'react';

import './History.css';

export class History extends PureComponent {
	render() {
		return (
			<section className="history">
				<h2 className="sec-ttl">История операций</h2>
				<div className="history-wrap">
					<table>
						<thead>
						<tr>
							<td>Операция</td>
							<td>Дата</td>
							<td>BTC</td>
							<td>USD</td>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>Продажа</td>
							<td>01.05.18 10:28</td>
							<td>-1</td>
							<td>8503.209</td>
						</tr>
						<tr>
							<td>Покупка</td>
							<td>01.05.18 12:13</td>
							<td>0.0602728098</td>
							<td>-518.29191912</td>
						</tr>
						<tr>
							<td>Продажа</td>
							<td>02.05.18 20:10</td>
							<td>-0.06027280985</td>
							<td>513.109</td>
						</tr>
						<tr>
							<td>Покупка</td>
							<td>06.06.18 09:43</td>
							<td>1</td>
							<td>-8599.1</td>
						</tr>
						<tr>
							<td>Продажа</td>
							<td>12.05.18 18:52</td>
							<td>-1</td>
							<td>9004.5945</td>
						</tr>
						</tbody>
					</table>
					<footer className="history-pagination">
					</footer>
				</div>
			</section>
		);
	}
};

export default History;
