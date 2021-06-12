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

export default class BayesReasoning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theftOfData: "none",
      signalLevelAlerts: "none",
      networkDisruptionOrDDoS: "none",
      incorrectlyConfiguredFirewalls: "none",
      configuration: "none",
      lossOrTheftOfDevice: "none",
      sensitiveInformation: "none",
      covertTimingChannel: "none",
      securityChecks: "none",
      identityTheftOrFraud: "none",
      interactingWithSystem: "none",
      communicationPaths: "none",
      inputContinentsValue: "",
      inputIndustryValue: "",
      inputCompanySizeValue: "",
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

    return (
      <div>
        <div
          class="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
          style={{ maxWidth: "100%" }}
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
                  <FormControlLabel value="0" control={<Radio />} label="Yes" />
                  <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
