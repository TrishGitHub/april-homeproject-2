import React, { PureComponent } from 'react';
import Particles from "react-particles-js";
import particlesParams from "./particles-params";

import './Canvas.css';

class Canvas extends PureComponent {
	render() {
		return (
			<Particles className="canvas"
				params={particlesParams}
			/>
		);
	}
}

export default Canvas;

