import React, { Component } from "react";
import styled from "styled-components";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Canvas from "../Canvas/Canvas";
import Trade from "../Trade";
import Chart from "../Chart";

import './UserPage.css';


const InnerContent = styled.section`
    width: 80%;
    height: auto;
    min-height: calc(100vh - 160px);
    padding: 20px;
    margin: auto;
    background: #fff;
`;

export class UserPage extends Component {
  render() {
    return (
        <div className="page-inner">
            <Canvas/>
            <Header />
            <InnerContent>
                <div className="col">
                    <Trade />
                    <Chart />
                </div>
            </InnerContent>
            <Footer />
        </div>
    );
  }
}

export default UserPage;
