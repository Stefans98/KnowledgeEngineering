import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import "../assets/styles/bayesReasoning.css";
import { Button, Modal } from "react-bootstrap";
import BayesReasoningService from "../services/BayesReasoningService";
import PrologService from "../services/PrologService";

export default class BayesReasoning extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
    this.messagesStartRef = React.createRef();
    this.state = {
      theftOfData: "",
      signalLevelAlerts: "",
      networkDisruptionOrDDoS: "",
      incorrectlyConfiguredFirewalls: "",
      configuration: "",
      lossOrTheftOfDevice: "",
      sensitiveInformation: "",
      covertTimingChannel: "",
      securityChecks: "",
      identityTheftOrFraud: "",
      interactingWithSystem: "",
      communicationPaths: "",
      inputContinentsValue: "",
      inputIndustryValue: "",
      inputCompanySizeValue: "",
      isOpenMitigationsModal: false,
      propagated: false,
      propagatedAttacks: [],
      mitigations: [],
    };
  }

  handleChangeNetworkDisruptionOrDDoS = (event) => {
    this.setState({ networkDisruptionOrDDoS: event.target.value });
  };

  handleChangeCommunicationPaths = (event) => {
    this.setState({ communicationPaths: event.target.value });
  };

  handleChangeTheftOfData = (event) => {
    this.setState({ theftOfData: event.target.value });
  };

  handleChangeIncorrectlyConfiguredFirewalls = (event) => {
    this.setState({ incorrectlyConfiguredFirewalls: event.target.value });
  };

  handleChangeSignalLevelAlerts = (event) => {
    this.setState({ signalLevelAlerts: event.target.value });
  };

  handleChangeConfiguration = (event) => {
    this.setState({ configuration: event.target.value });
  };

  handleChangeLossOrTheftOfDevice = (event) => {
    this.setState({ lossOrTheftOfDevice: event.target.value });
  };

  handleChangeSensitiveInformation = (event) => {
    this.setState({ sensitiveInformation: event.target.value });
  };

  handleChangeSecurityChecks = (event) => {
    this.setState({ securityChecks: event.target.value });
  };

  handleChangeInteractingWithSystem = (event) => {
    this.setState({ interactingWithSystem: event.target.value });
  };

  handleChangeCovertTimingChannel = (event) => {
    this.setState({ covertTimingChannel: event.target.value });
  };

  handleChangeIdentityTheftOrFraud = (event) => {
    this.setState({ identityTheftOrFraud: event.target.value });
  };

  openMitigationsModal = (attackName) => {
    var name = this.lowerCaseFirstLetter(attackName).replace("-", "");

    PrologService.getMitigations(name)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ mitigations: data, isOpenMitigationsModal: true });
      });
  };

  closeMitigationsModal = () =>
    this.setState({ isOpenMitigationsModal: false });

  propagate = () => {
    this.setState({ propagated: true }, () => {
      let networkDisruptionOrDDoS =
        this.state.networkDisruptionOrDDoS === ""
          ? null
          : this.state.networkDisruptionOrDDoS;
      let incorrectlyConfiguredFirewalls =
        this.state.incorrectlyConfiguredFirewalls === ""
          ? null
          : this.state.incorrectlyConfiguredFirewalls;
      let lossOrTheftOfDevice =
        this.state.lossOrTheftOfDevice === ""
          ? null
          : this.state.lossOrTheftOfDevice;
      let interactingWithSystem =
        this.state.interactingWithSystem === ""
          ? null
          : this.state.interactingWithSystem;
      let communicationPaths =
        this.state.communicationPaths === ""
          ? null
          : this.state.communicationPaths;
      let signalLevelAlerts =
        this.state.signalLevelAlerts === ""
          ? null
          : this.state.signalLevelAlerts;
      let sensitiveInformation =
        this.state.sensitiveInformation === ""
          ? null
          : this.state.sensitiveInformation;
      let covertTimingChannel =
        this.state.covertTimingChannel === ""
          ? null
          : this.state.covertTimingChannel;
      let theftOfData =
        this.state.theftOfData === "" ? null : this.state.theftOfData;
      let configuration =
        this.state.configuration === "" ? null : this.state.configuration;
      let securityChecks =
        this.state.securityChecks === "" ? null : this.state.securityChecks;
      let identityTheftOrFraud =
        this.state.identityTheftOrFraud === ""
          ? null
          : this.state.identityTheftOrFraud;
      let inputContinentsValue =
        this.state.inputContinentsValue === ""
          ? null
          : this.state.inputContinentsValue;
      let inputIndustryValue =
        this.state.inputIndustryValue === ""
          ? null
          : this.state.inputIndustryValue;
      let inputCompanySizeValue =
        this.state.inputCompanySizeValue === ""
          ? null
          : this.state.inputCompanySizeValue;

      if (inputContinentsValue == "Europe") {
        inputContinentsValue = 0;
      } else if (inputContinentsValue == "Asia") {
        inputContinentsValue = 1;
      } else if (inputContinentsValue == "North America") {
        inputContinentsValue = 2;
      } else if (inputContinentsValue == "South America") {
        inputContinentsValue = 3;
      } else if (inputContinentsValue == "Australia") {
        inputContinentsValue = 4;
      }
      if (inputIndustryValue === "Services") {
        inputIndustryValue = 0;
      } else if (inputIndustryValue === "Manufacturing") {
        inputIndustryValue = 1;
      } else if (inputIndustryValue === "Finance, Insurance & Real Estate") {
        inputIndustryValue = 2;
      } else if (inputIndustryValue === "Public Administration") {
        inputIndustryValue = 3;
      } else if (inputIndustryValue === "Nonclassifiable Establishments") {
        inputIndustryValue = 4;
      }
      if (inputCompanySizeValue === "1-250") {
        inputCompanySizeValue = 0;
      } else if (inputCompanySizeValue === "251-500") {
        inputCompanySizeValue = 1;
      } else if (inputCompanySizeValue === "501-1000") {
        inputCompanySizeValue = 2;
      } else if (inputCompanySizeValue === "1000+") {
        inputCompanySizeValue = 3;
      }
      BayesReasoningService.propagateAttacks(
        networkDisruptionOrDDoS,
        incorrectlyConfiguredFirewalls,
        lossOrTheftOfDevice,
        interactingWithSystem,
        communicationPaths,
        signalLevelAlerts,
        sensitiveInformation,
        covertTimingChannel,
        theftOfData,
        configuration,
        securityChecks,
        identityTheftOrFraud,
        inputContinentsValue,
        inputIndustryValue,
        inputCompanySizeValue
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState(
            {
              propagatedAttacks: data,
            },
            () => {
              this.scrollToBottom();
            }
          );
        });
    });
  };

  closeOverview = () => {
    this.setState(
      {
        propagated: false,
        theftOfData: "",
        signalLevelAlerts: "",
        networkDisruptionOrDDoS: "",
        incorrectlyConfiguredFirewalls: "",
        configuration: "",
        lossOrTheftOfDevice: "",
        sensitiveInformation: "",
        covertTimingChannel: "",
        securityChecks: "",
        identityTheftOrFraud: "",
        interactingWithSystem: "",
        communicationPaths: "",
        inputContinentsValue: "",
        inputIndustryValue: "",
        inputCompanySizeValue: "",
      },
      () => {
        this.scrollToTop();
      }
    );
  };

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  scrollToTop = () => {
    this.messagesStartRef.current.scrollIntoView({ behavior: "smooth" });
  };

  calculatePercentage = (percentage) => {
    var result = percentage * 100;
    return result.toFixed(2) + "%";
  };

  lowerCaseFirstLetter = (attackName) => {
    return attackName.charAt(0).toLowerCase() + attackName.slice(1);
  };

  render() {
    const continets = [
      { state: "Europe" },
      { state: "Asia" },
      { state: "North America" },
      { state: "South America" },
      { state: "Australia" },
    ];

    const industry = [
      { state: "Services" },
      { state: "Manufacturing" },
      { state: "Finance, Insurance & Real Estate" },
      { state: "Public Administration" },
      { state: "Nonclassifiable Establishments" },
    ];

    const companySize = [
      { state: "1-250" },
      { state: "251-500" },
      { state: "501-1000" },
      { state: "1000+" },
    ];

    const mitigationsModalDialog = (
      <Modal
        show={this.state.isOpenMitigationsModal}
        onHide={this.closeMitigationsModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "165px", color: "#74767a" }}>
            Mitigations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", height: "300px", padding: "15px" }}>
            {this.state.mitigations.map((mitigation, key) => {
              return (
                <div key={key}>
                  <Grid container spacing={20}>
                    <Grid container item xs spacing={20}>
                      <p style={{ color: "#74767a" }}>- {mitigation.name}</p>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeMitigationsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const attacks = (
      <div class="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
        <h4
          style={{
            textAlign: "left",
            color: "#74767a",
            paddingBottom: "50px",
          }}
        >
          Attacks overview after propagation:
        </h4>
        <div class="graph-star-rating-body">
          {this.state.propagatedAttacks.map((attack, key) => {
            return (
              <div key={key}>
                <div class="rating-list">
                  <div class="rating-list-left text-black">
                    <h5 style={{ textAlign: "left", color: "#74767a" }}>
                      {attack.attackName.replaceAll("_", " ")}
                    </h5>
                  </div>
                  <div class="rating-list-center">
                    <div class="progress">
                      <div
                        style={{
                          width: this.calculatePercentage(
                            attack.itHappenPercentage
                          ),
                        }}
                        aria-valuemax="5"
                        aria-valuemin="0"
                        aria-valuenow="5"
                        role="progressbar"
                        class="progress-bar bg-primary"
                      ></div>
                    </div>
                  </div>
                  <div class="rating-list-right text-black">
                    {" "}
                    {this.calculatePercentage(attack.itHappenPercentage)}
                  </div>
                  <div class="rating-list-end">
                    <button
                      type="button"
                      onClick={() => {
                        this.openMitigationsModal(attack.attackName);
                      }}
                      class="btn btn-outline-success btn-sm"
                      style={{ width: "150px", fontSize: "17px" }}
                    >
                      Mitigations
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class="graph-star-rating-footer text-center mt-5 mb-3">
          <button
            type="button"
            onClick={this.closeOverview}
            class="btn btn-outline-primary btn-sm"
            style={{ width: "200px", fontSize: "17px" }}
          >
            Close overview
          </button>
        </div>
      </div>
    );

    return (
      <div>
        {mitigationsModalDialog}
        <div
          class="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
          style={{ maxWidth: "100%" }}
          ref={this.messagesStartRef}
        >
          <h3 style={{ textAlign: "center", color: "#74767a" }}>
            Bayes parameters
          </h3>
          <br />
          <h4 style={{ textAlign: "left", color: "#74767a" }}>
            Choose enterprise characteristics:
          </h4>
          <br />
          <Grid container spacing={5}>
            <Grid item xs>
              <Autocomplete
                id="continent"
                inputValue={this.state.inputContinentsValue}
                onInputChange={(event, newInputValue) => {
                  if (newInputValue === "") {
                    newInputValue = null;
                  }
                  this.setState({ inputContinentsValue: newInputValue }, () => {
                    console.log(this.state.inputContinentsValue);
                  });
                }}
                options={continets}
                getOptionLabel={(option) => option.state}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Continent" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                id="industry"
                inputValue={this.state.inputIndustryValue}
                onInputChange={(event, newInputValue) => {
                  if (newInputValue === "") {
                    newInputValue = null;
                  }
                  this.setState({ inputIndustryValue: newInputValue }, () => {
                    console.log(this.state.inputIndustryValue);
                  });
                }}
                options={industry}
                getOptionLabel={(option) => option.state}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Industry" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                id="companySize"
                inputValue={this.state.inputCompanySizeValue}
                onInputChange={(event, newInputValue) => {
                  if (newInputValue === "") {
                    newInputValue = null;
                  }
                  this.setState(
                    { inputCompanySizeValue: newInputValue },
                    () => {
                      console.log(this.state.inputCompanySizeValue);
                    }
                  );
                }}
                options={companySize}
                getOptionLabel={(option) => option.state}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company size"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <h4 style={{ textAlign: "left", color: "#74767a" }}>
            Choose threat characteristics:
          </h4>
          <br />

          <Grid container spacing={5}>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Network disruption or DDoS
                </FormLabel>
                <RadioGroup
                  aria-label="networkDisruptionOrDDoS"
                  name="networkDisruptionOrDDoS"
                  value={this.state.networkDisruptionOrDDoS}
                  onChange={this.handleChangeNetworkDisruptionOrDDoS}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Communication paths</FormLabel>
                <RadioGroup
                  aria-label="communicationPaths"
                  name="communicationPaths"
                  value={this.state.communicationPaths}
                  onChange={this.handleChangeCommunicationPaths}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Trusted"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Untrusted"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Theft of data</FormLabel>
                <RadioGroup
                  aria-label="theftOfData"
                  name="theftOfData"
                  value={this.state.theftOfData}
                  onChange={this.handleChangeTheftOfData}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Incorrectly configured firewalls
                </FormLabel>
                <RadioGroup
                  aria-label="incorrectlyConfiguredFirewalls"
                  name="incorrectlyConfiguredFirewalls"
                  value={this.state.incorrectlyConfiguredFirewalls}
                  onChange={this.handleChangeIncorrectlyConfiguredFirewalls}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Signal level alerts</FormLabel>
                <RadioGroup
                  aria-label="signalLevelAlerts"
                  name="signalLevelAlerts"
                  value={this.state.signalLevelAlerts}
                  onChange={this.handleChangeSignalLevelAlerts}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Configuration </FormLabel>
                <RadioGroup
                  aria-label="configuration"
                  name="configuration"
                  value={this.state.configuration}
                  onChange={this.handleChangeConfiguration}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Good"
                  />
                  <FormControlLabel value="1" control={<Radio />} label="Bad" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Loss or theft of device
                </FormLabel>
                <RadioGroup
                  aria-label="lossOrTheftOfDevice"
                  name="lossOrTheftOfDevice"
                  value={this.state.lossOrTheftOfDevice}
                  onChange={this.handleChangeLossOrTheftOfDevice}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sensitive information</FormLabel>
                <RadioGroup
                  aria-label="sensitiveInformation"
                  name="sensitiveInformation"
                  value={this.state.sensitiveInformation}
                  onChange={this.handleChangeSensitiveInformation}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Protected"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Not Protected"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Security checks</FormLabel>
                <RadioGroup
                  aria-label="securityChecks"
                  name="securityChecks"
                  value={this.state.securityChecks}
                  onChange={this.handleChangeSecurityChecks}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Interacting with system
                </FormLabel>
                <RadioGroup
                  aria-label="interactingWithSystem"
                  name="interactingWithSystem"
                  value={this.state.interactingWithSystem}
                  onChange={this.handleChangeInteractingWithSystem}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Covert timing channel</FormLabel>
                <RadioGroup
                  aria-label="covertTimingChannel"
                  name="covertTimingChannel"
                  value={this.state.covertTimingChannel}
                  onChange={this.handleChangeCovertTimingChannel}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Identity theft or fraud
                </FormLabel>
                <RadioGroup
                  aria-label="identityTheftOrFraud"
                  name="identityTheftOrFraud"
                  value={this.state.identityTheftOrFraud}
                  onChange={this.handleChangeIdentityTheftOrFraud}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <div class="graph-star-rating-footer text-center mt-5 mb-3">
            <button
              type="button"
              onClick={this.propagate}
              class="btn btn-outline-primary btn-sm"
              style={{ width: "200px", fontSize: "17px" }}
            >
              Propagate
            </button>
          </div>
        </div>
        {this.state.propagated ? attacks : ""}
        <div ref={this.messagesEndRef} />
      </div>
    );
  }
}
