import React, { Component } from "react";

import "./Footer.css"


class MainFooter extends Component {
  render() {
	  return(
          <div className="footer">
              <div className="container">
                  <p className="copy">
                      Сделано с любовью и старанием
                      на курсе «React.js» в <a className="link" href="https://loftschool.com/" target="_blank" rel="noopener noreferrer">LoftSchool.</a>
                      Автор работы: <span className="color">Ира Нощенко</span>
                  </p>
                  <img src="/images/Logo-white.svg" className="logo" alt="J-Traiding logo"/>
              </div>
          </div>
	  );
  }
}

export default MainFooter;
