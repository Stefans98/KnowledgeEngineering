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

export default class CaseBaseReasoning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPrerequisitesValue: [],
      inputConsequencesValue: [],
      inputWeaknessesValue: [],
      inputMitigationsValue: [],
      likelihood: "0",
      severity: "0"
    };
  }

  handleChangeLikelihood = (event) => {
    this.setState({ likelihood: event.target.value });
  };

  handleChangeSeverity = (event) => {
    this.setState({ severity: event.target.value });
  };

  propagate = () => {
    console.log(this.state.inputPrerequisitesValue);
    console.log(this.state.inputConsequencesValue);
    console.log(this.state.inputWeaknessesValue);
    console.log(this.state.inputMitigationsValue);
    console.log(this.state.likelihood);
    console.log(this.state.severity);
  }

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
          <h4 style={{ textAlign: "left", color: "#74767a" }}>
            Choose attack characteristics:
          </h4>

          <Grid container spacing={5}>
            <Grid item xs>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="prerequisites"
                onChange={(event, newInputValue) => {
                  this.setState({ inputPrerequisitesValue: newInputValue }, () => {
                    console.log(this.state.inputPrerequisitesValue);
                  });
                }}
                options={continets}
                getOptionLabel={(option) => option.state}
                style={{ width: 600 }}
                renderInput={(params) => (
                  <TextField {...params} label="Prerequisites" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="consequences"
                onChange={(event, newInputValue) => {
                  this.setState({ inputConsequencesValue: newInputValue }, () => {
                    console.log(this.state.inputConsequencesValue);
                  });
                }}
                options={industry}
                getOptionLabel={(option) => option.state}
                style={{ width: 600 }}
                renderInput={(params) => (
                  <TextField {...params} label="Consequences" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="weaknesses"
                onChange={(event, newInputValue) => {
                  this.setState(
                    { inputWeaknessesValue: newInputValue },
                    () => {
                      console.log(this.state.inputWeaknessesValue);
                    }
                  );
                }}
                options={companySize}
                getOptionLabel={(option) => option.state}
                style={{ width: 600 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Weaknesses"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="mitigations"
                onChange={(event, newInputValue) => {
                  this.setState(
                    { inputMitigationsValue: newInputValue },
                    () => {
                      console.log(this.state.inputMitigationsValue);
                    }
                  );
                }}
                options={companySize}
                getOptionLabel={(option) => option.state}
                style={{ width: 600 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mitigations"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Likelihood
                </FormLabel>
                <RadioGroup
                  aria-label="interactingWithSystem"
                  name="interactingWithSystem"
                  value={this.state.likelihood}
                  onChange={this.handleChangeLikelihood}
                >
                  <FormControlLabel value="0" control={<Radio />} label="Low" />
                  <FormControlLabel value="1" control={<Radio />} label="Medium" />
                  <FormControlLabel value="2" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Severity
                </FormLabel>
                <RadioGroup
                  aria-label="interactingWithSystem"
                  name="interactingWithSystem"
                  value={this.state.severity}
                  onChange={this.handleChangeSeverity}
                >
                  <FormControlLabel value="0" control={<Radio />} label="Low" />
                  <FormControlLabel value="1" control={<Radio />} label="Medium" />
                  <FormControlLabel value="2" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
            </Grid>          
          </Grid>

          <div class="graph-star-rating-footer text-center mt-4 mb-3">
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
      </div>
    );
  }
}
