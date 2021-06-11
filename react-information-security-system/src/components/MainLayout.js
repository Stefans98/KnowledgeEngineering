import React, { Component } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route, withRouter } from "react-router";
import "../assets/styles/mainLayout.css";
import Attacks from "./Attacks";
import BayesReasoning from "./BayesReasoning";
import CaseBaseReasoning from "./CaseBaseReasoning";
import VulnerabilityCalculator from "./VulnerabilityCalculator";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showAttacks = () => {
    this.props.history.push("/attacks");
    document.getElementById("div1").className = "col-md-4 col-xl-3";
    document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
  };

  showCaseBaseReasoning = () => {
    this.props.history.push("/caseBaseReasoning");
    document.getElementById("div2").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
  };

  showBayesReasoning = () => {
    this.props.history.push("/bayesReasoning");
    document.getElementById("div3").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div4").className = "col-md-4 col-xl-3 opacity";
  };

  showVulnerabilityCalculator = () => {
    this.props.history.push("/vulnerabilityCalculator");
    document.getElementById("div4").className = "col-md-4 col-xl-3";
    document.getElementById("div1").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div2").className = "col-md-4 col-xl-3 opacity";
    document.getElementById("div3").className = "col-md-4 col-xl-3 opacity";
  };

  render() {
    return (
      <div>
        <div class="container" style={{ marginTop: "20px", maxWidth: "85%" }}>
          <div class="row">
            <div
              className="col-md-4 col-xl-3"
              id="div1"
              onClick={this.showAttacks}
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
              onClick={this.showCaseBaseReasoning}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-blue order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fa fa-shield-virus f-left"></i>
                    </h2>
                    &emsp;Case Base Reasoning
                  </h5>
                </div>
              </div>
            </div>

            <div
              class="col-md-4 col-xl-3 opacity"
              id="div3"
              onClick={this.showBayesReasoning}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fab fa-battle-net f-left"></i>
                    </h2>
                    &emsp;Bayes Reasoning
                  </h5>
                </div>
              </div>
            </div>

            <div
              class="col-md-4 col-xl-3 opacity"
              id="div4"
              onClick={this.showVulnerabilityCalculator}
              style={{ cursor: "pointer" }}
            >
              <div class="card bg-c-green order-card">
                <div class="card-block">
                  <h5 class="m-b-20">
                    <h2 class="text-right">
                      <i class="fa fa-calculator f-left"></i>
                    </h2>
                    &emsp;Vulnerability Calculator
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard">
          <Switch>
            <Route path="/attacks">
              <Attacks />
            </Route>
            <Route path="/caseBaseReasoning">
              <CaseBaseReasoning />{" "}
            </Route>
            <Route path="/bayesReasoning">
              <BayesReasoning />{" "}
            </Route>
            <Route path="/vulnerabilityCalculator">
              <VulnerabilityCalculator />
            </Route>
            {/* <Route path="/">
              <NotFound />
            </Route> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);
