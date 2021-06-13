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
import { Button, Modal } from "react-bootstrap";
import "../assets/styles/bayesReasoning.css";
import CaseBaseReasoningService from "../services/CaseBaseReasoningService";
import PrologService from "../services/PrologService";

export default class CaseBaseReasoning extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
    this.messagesStartRef = React.createRef();
    this.state = {
      inputPrerequisitesValue: [],
      inputConsequencesValue: [],
      inputWeaknessesValue: [],
      inputMitigationsValue: [],
      likelihood: "0",
      severity: "0",
      isOpenMitigationsModal: false,
      propagated: false,
      attacks: [],
      mitigations: []
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

    var likelihoodParam = 0;
    if(this.state.likelihood == "0"){
      likelihoodParam = 0;
    }else if(this.state.likelihood == "1"){
      likelihoodParam = 1;
    }else if(this.state.likelihood == "2"){
      likelihoodParam = 2;
    }

    var severityParam = 0;
    if(this.state.severity == "0"){
      severityParam = 0;
    }else if(this.state.severity == "1"){
      severityParam = 1;
    }else if(this.state.severity == "2"){
      severityParam = 2;
    }

    var prerequisitesString = "";
    for(let i = 0; i < this.state.inputPrerequisitesValue.length; i++){
      if(i == 0){
        prerequisitesString = prerequisitesString.concat(this.state.inputPrerequisitesValue[i].state);
      }else {
        prerequisitesString = prerequisitesString.concat(", ", this.state.inputPrerequisitesValue[i].state);
      }
    }

    var consequencesString = "";
    for(let i = 0; i < this.state.inputConsequencesValue.length; i++){
      if(i == 0){
        consequencesString = consequencesString.concat(this.state.inputConsequencesValue[i].state);
      }else {
        consequencesString = consequencesString.concat(", ", this.state.inputConsequencesValue[i].state);
      }
    }

    var weaknessesString = "";
    for(let i = 0; i < this.state.inputWeaknessesValue.length; i++){
      if(i == 0){
        weaknessesString = weaknessesString.concat(this.state.inputWeaknessesValue[i].state);
      }else{
        weaknessesString = weaknessesString.concat(", ", this.state.inputWeaknessesValue[i].state);
      }
    }

    var mitigationsString = "";
    for(let i = 0; i < this.state.inputMitigationsValue.length; i++){
      if(i == 0){
        mitigationsString = mitigationsString.concat(this.state.inputMitigationsValue[i].state);
      }else{
        mitigationsString = mitigationsString.concat(", ", this.state.inputMitigationsValue[i].state);
      }
    }

    CaseBaseReasoningService.propagate(likelihoodParam, severityParam, prerequisitesString, consequencesString, 
      weaknessesString, mitigationsString)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            attacks : data
          },() => {
            this.scrollToBottom();
          });
        });

    this.setState({ propagated: true });

  }

  closeOverview = () => {
    this.setState({ propagated: false });
  };

  calculatePercentage = (percentage) => {
    var result = percentage * 100;
    return result.toFixed(2) + "%";
  };

  lowerCaseFirstLetter = (attackName) => {
    return attackName.charAt(0).toLowerCase() + attackName.slice(1);
  };

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  scrollToTop = () => {
    this.messagesStartRef.current.scrollIntoView({ behavior: "smooth" });
  };

  openMitigationsModal = (attackName) => {
    var name = this.lowerCaseFirstLetter(attackName);

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
          {this.state.attacks.map((attack, key) => {
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
                            attack.similarity
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
                    {this.calculatePercentage(attack.similarity)}
                  </div>
                  <div class="rating-list-end">
                    <button
                      type="button"
                      onClick={() => {
                        this.openMitigationsModal(attack.attackName.replaceAll(" ", "_"));
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
        >
          <h4 style={{ textAlign: "left", color: "#74767a" }}>
            Choose attack characteristics:
          </h4>
          <br/>

          <Grid container spacing={5}>
            <Grid item xs>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="prerequisites"
                onInputChange={(event, newInputValue) => {
                  this.setState({ inputPrerequisitesValue: newInputValue }, () => {
                    console.log(this.state.inputPrerequisitesValue);
                  });
                }}
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
          <br/>
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

        {this.state.propagated ? attacks : ""}
        <div ref={this.messagesEndRef} />

        
      </div>
    );
  }
}
