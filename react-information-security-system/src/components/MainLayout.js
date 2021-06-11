import React, { Component } from "react";
import "../assets/styles/mainLayout.css";
import Attacks from "./Attacks";

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showAttacks1 = () => {
    if (
      (document.getElementById("div1").className = "col-md-4 col-xl-3 opacity")
    ) {
      document.getElementById("div1").className = "col-md-4 col-xl-3";
      document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
      document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
      document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
    }
  };

  showAttacks2 = () => {
    document.getElementById("div2").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
  };

  showAttacks3 = () => {
    document.getElementById("div3").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
  };

  showAttacks4 = () => {
    document.getElementById("div4").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
  };

  render() {
    return (
      <div>
        <div class="container" style={{ marginTop: "20px" }}>
          <div class="row">
            <div
              className="col-md-4 col-xl-3"
              id="div1"
              onClick={this.showAttacks1}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-pink order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fas fa-virus f-left"></i>
                    </h2>
                    &emsp;Attacks
                  </h5>
                </div>
              </div>
            </div>

            <div
              class="col-md-4 col-xl-3 opacity"
              id="div2"
              onClick={this.showAttacks2}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-blue order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fa fa-shield-virus f-left"></i>
                    </h2>
                    &emsp;New Attack
                  </h5>
                </div>
              </div>
            </div>

            <div
              class="col-md-4 col-xl-3 opacity"
              id="div3"
              onClick={this.showAttacks3}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fa fa-globe-americas f-left"></i>
                    </h2>
                    &emsp;Bayes
                  </h5>
                </div>
              </div>
            </div>

            <div
              class="col-md-4 col-xl-3 opacity"
              id="div4"
              onClick={this.showAttacks4}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-green order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fa fa-calculator f-left"></i>
                    </h2>
                    &emsp;Calculator
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard">
          <Attacks />
        </div>
      </div>
    );
  }
}
