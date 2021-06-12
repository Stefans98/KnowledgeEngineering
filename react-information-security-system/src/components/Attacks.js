import React, { Component } from "react";
//import "../assets/styles/attacks.css";

export default class Attacks extends Component {
  render() {
    return (
      <div>
        <div class="container" style={{ maxWidth: "100%" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive project-list">
                    <table class="table project-table table-centered table-nowrap fixed_header">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Attack name</th>
                          <th scope="col">Likelihood</th>
                          <th scope="col">Severity</th>
                          <th scope="col">Prerequisites</th>
                          <th scope="col">Consequences</th>
                          <th scope="col">Weaknesses</th>
                          <th scope="col">Mitigations</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Landing page Design</td>
                          <td>04/6/2019</td>
                          <td>
                            <span class="text-primary font-12">
                              <i class="mdi mdi-checkbox-blank-circle mr-1"></i>{" "}
                              Pending
                            </span>
                          </td>
                          <td>aaaa</td>
                          <td>
                            <p class="mb-0">
                              Progress<span class="float-right">78%</span>
                            </p>

                            <div
                              class="progress mt-2"
                              style={{ height: "5px" }}
                            >
                              <div
                                class="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "78%" }}
                                aria-valuenow="78"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                          <td>Landing page Design</td>
                          <td>Landing page Design</td>
                          <td>
                            <div class="action">
                              <a
                                href="#"
                                class="text-success mr-4"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Edit"
                              >
                                {" "}
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Close"
                              >
                                <i class="fa fa-trash-alt"></i>
                              </a>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">2</th>
                          <td>Brand logo design</td>
                          <td>08/6/2019</td>
                          <td>
                            <span class="text-primary font-12">
                              <i class="mdi mdi-checkbox-blank-circle mr-1"></i>{" "}
                              Pending
                            </span>
                          </td>
                          <td>
                            <div class="team">
                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Deborah Mixon"
                              ></a>

                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Scott Jessie"
                              ></a>
                            </div>
                          </td>
                          <td>
                            <p class="mb-0">
                              Progress<span class="float-right">54%</span>
                            </p>

                            <div
                              class="progress mt-2"
                              style={{ height: "5px" }}
                            >
                              <div
                                class="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: "54%" }}
                                aria-valuenow="54"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                          <td>Landing page Design</td>
                          <td>Landing page Design</td>
                          <td>
                            <div class="action">
                              <a
                                href="#"
                                class="text-success mr-4"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Edit"
                              >
                                {" "}
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Close"
                              >
                                <i class="fa fa-trash-alt"></i>
                              </a>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">3</th>
                          <td>Redesign - Landing page</td>
                          <td>10/6/2019</td>
                          <td>
                            <span class="text-primary font-12">
                              <i class="mdi mdi-checkbox-blank-circle mr-1"></i>{" "}
                              Pending
                            </span>
                          </td>
                          <td>
                            <div class="team">
                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Neil Wing"
                              ></a>

                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Stanley Barber"
                              ></a>
                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Roger Drake"
                              ></a>

                              <a
                                href="javascript: void(0);"
                                class="team-member"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Jack Krier"
                              ></a>
                            </div>
                          </td>
                          <td>
                            <p class="mb-0">
                              Progress<span class="float-right">41%</span>
                            </p>

                            <div
                              class="progress mt-2"
                              style={{ height: "5px" }}
                            >
                              <div
                                class="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "41%" }}
                                aria-valuenow="41"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                          <td>Landing page Design</td>
                          <td>Landing page Design</td>
                          <td>
                            <div class="action">
                              <a
                                href="#"
                                class="text-success mr-4"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Edit"
                              >
                                {" "}
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Close"
                              >
                                <i class="fa fa-trash-alt"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
