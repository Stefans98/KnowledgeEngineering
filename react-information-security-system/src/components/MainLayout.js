import React, { Component } from "react";
import "../assets/styles/mainLayout.css";
import Attacks from "./Attacks";

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <div class="container" style={{ marginTop: "20px" }}>
          <div class="row">
            <div class="col-md-4 col-xl-3">
              <div class="card bg-c-blue order-card">
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

            <div class="col-md-4 col-xl-3">
              <div class="card bg-c-green order-card">
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

            <div class="col-md-4 col-xl-3">
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

            <div class="col-md-4 col-xl-3">
              <div class="card bg-c-pink order-card">
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
