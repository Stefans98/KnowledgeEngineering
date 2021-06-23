import React, { Component } from "react";
import AttackService from "../services/AttackService";
import "../assets/styles/attacks.css";
import { Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
} from "@material-ui/core";
import "../assets/styles/bayesReasoning.css";
import Alert from "@material-ui/lab/Alert";

export default class Attacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attacks: [],
      isOpenNewAttackModal: false,
      isOpenChangeAttackModal: false,
      inputPrerequisitesValue: [],
      inputConsequencesValue: [],
      inputWeaknessesValue: [],
      inputMitigationsValue: [],
      likelihood: "0",
      severity: "0",
      open: false,
      message: "",
      snackbarType: "success",
      attackName: "",
      attackId: 0,
    };
  }

  componentDidMount() {
    this.getAttacks();
  }

  lowerCaseFirstLetter = (attackName) => {
    return attackName.charAt(0).toLowerCase() + attackName.slice(1);
  };

  getAttacks = () => {
    AttackService.getAttacks()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ attacks: data });
      });
  };

  deleteAttack = (attackName) => {
    let name = this.lowerCaseFirstLetter(attackName).replaceAll(" ", "_");
    name = name.replaceAll("-", "");

    AttackService.deleteAttack(name)
      .then((res) => {
        this.getAttacks();
        this.handleClickSnackBar("Attack is deleted", "info");
        return res.json();
      })
      .then((data) => {});
  };

  addAttack = () => {
    var likelihoodParam = 0;
    if (this.state.likelihood === "0") {
      likelihoodParam = 0;
    } else if (this.state.likelihood === "1") {
      likelihoodParam = 1;
    } else if (this.state.likelihood === "2") {
      likelihoodParam = 2;
    }

    var severityParam = 0;
    if (this.state.severity === "0") {
      severityParam = 0;
    } else if (this.state.severity === "1") {
      severityParam = 1;
    } else if (this.state.severity === "2") {
      severityParam = 2;
    }

    var prerequisitesString = "";
    for (let i = 0; i < this.state.inputPrerequisitesValue.length; i++) {
      if (i === 0) {
        prerequisitesString = prerequisitesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputPrerequisitesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        prerequisitesString = prerequisitesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputPrerequisitesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var consequencesString = "";
    for (let i = 0; i < this.state.inputConsequencesValue.length; i++) {
      if (i === 0) {
        consequencesString = consequencesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputConsequencesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        consequencesString = consequencesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputConsequencesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var weaknessesString = "";
    for (let i = 0; i < this.state.inputWeaknessesValue.length; i++) {
      if (i === 0) {
        weaknessesString = weaknessesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputWeaknessesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        weaknessesString = weaknessesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputWeaknessesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var mitigationsString = "";
    for (let i = 0; i < this.state.inputMitigationsValue.length; i++) {
      if (i === 0) {
        mitigationsString = mitigationsString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputMitigationsValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        mitigationsString = mitigationsString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputMitigationsValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    AttackService.saveAttack(
      likelihoodParam,
      severityParam,
      prerequisitesString,
      consequencesString,
      weaknessesString,
      mitigationsString
    )
      .then((res) => {
        this.getAttacks();
        return res.json();
      })
      .then((data) => {
        this.closeNewAttackModal();
        this.handleClickSnackBar("New attack is successfully added", "success");
      });
  };

  changeAttack = () => {
    var likelihoodParam = 0;
    if (this.state.likelihood === "0") {
      likelihoodParam = 0;
    } else if (this.state.likelihood === "1") {
      likelihoodParam = 1;
    } else if (this.state.likelihood === "2") {
      likelihoodParam = 2;
    }

    var severityParam = 0;
    if (this.state.severity === "0") {
      severityParam = 0;
    } else if (this.state.severity === "1") {
      severityParam = 1;
    } else if (this.state.severity === "2") {
      severityParam = 2;
    }

    var prerequisitesString = "";
    for (let i = 0; i < this.state.inputPrerequisitesValue.length; i++) {
      if (i === 0) {
        prerequisitesString = prerequisitesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputPrerequisitesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        prerequisitesString = prerequisitesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputPrerequisitesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var consequencesString = "";
    for (let i = 0; i < this.state.inputConsequencesValue.length; i++) {
      if (i === 0) {
        consequencesString = consequencesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputConsequencesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        consequencesString = consequencesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputConsequencesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var weaknessesString = "";
    for (let i = 0; i < this.state.inputWeaknessesValue.length; i++) {
      if (i === 0) {
        weaknessesString = weaknessesString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputWeaknessesValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        weaknessesString = weaknessesString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputWeaknessesValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    var mitigationsString = "";
    for (let i = 0; i < this.state.inputMitigationsValue.length; i++) {
      if (i === 0) {
        mitigationsString = mitigationsString.concat(
          this.lowerCaseFirstLetter(
            this.state.inputMitigationsValue[i].state
          ).replaceAll(" ", "_")
        );
      } else {
        mitigationsString = mitigationsString.concat(
          "__",
          this.lowerCaseFirstLetter(
            this.state.inputMitigationsValue[i].state
          ).replaceAll(" ", "_")
        );
      }
    }

    AttackService.changeAttack(
      this.state.attackId,
      this.state.attackName,
      likelihoodParam,
      severityParam,
      prerequisitesString,
      consequencesString,
      weaknessesString,
      mitigationsString
    )
      .then((res) => {
        this.getAttacks();
        return res.json();
      })
      .then((data) => {
        this.closeChangeAttackModal();
        this.handleClickSnackBar("Attack is successfully changed", "success");
      });
  };

  openNewAttackModal = () => {
    this.setState({ isOpenNewAttackModal: true });
  };

  closeNewAttackModal = () =>
    this.setState({
      isOpenNewAttackModal: false,
      inputPrerequisitesValue: [],
      inputConsequencesValue: [],
      inputWeaknessesValue: [],
      inputMitigationsValue: [],
      likelihood: "0",
      severity: "0",
    });

  openChangeAttackModal = (attack) => {
    let name = this.lowerCaseFirstLetter(attack.name).replaceAll(" ", "_");
    name = name.replaceAll("-", "");
    this.setState({
      attackName: name,
      attackId: attack.id,
    });

    var severity;
    if (attack.severity === "Low") {
      severity = "0";
    } else if (attack.severity === "Medium") {
      severity = "1";
    } else {
      severity = "2";
    }

    var likelihood;
    if (attack.likelihood === "Low") {
      likelihood = "0";
    } else if (attack.likelihood === "Medium") {
      likelihood = "1";
    } else {
      likelihood = "2";
    }

    var prerequisitesList = [];
    var prerequisitesParts = attack.prerequisites.name.split(", ");

    for (let i = 0; i < prerequisitesParts.length; i++) {
      if (prerequisitesParts[i] !== "None") {
        prerequisitesList.push({ state: prerequisitesParts[i] });
      }
    }

    var consequencesList = [];
    var consequencesParts = attack.consequences.name.split(", ");

    for (let i = 0; i < consequencesParts.length; i++) {
      if (consequencesParts[i] !== "Unspecified") {
        consequencesList.push({ state: consequencesParts[i] });
      }
    }

    var weaknessesList = [];
    var weaknessesParts = attack.weaknesses.name.split(", ");

    for (let i = 0; i < weaknessesParts.length; i++) {
      if (weaknessesParts[i] !== "Unspecified") {
        weaknessesList.push({ state: weaknessesParts[i] });
      }
    }

    var mitigationsList = [];
    var mitigationsParts = attack.mitigations.name.split(", ");

    for (let i = 0; i < mitigationsParts.length; i++) {
      if (mitigationsParts[i] !== "Unspecified") {
        mitigationsList.push({ state: mitigationsParts[i] });
      }
    }

    this.setState({
      isOpenChangeAttackModal: true,
      inputPrerequisitesValue: prerequisitesList,
      inputConsequencesValue: consequencesList,
      inputWeaknessesValue: weaknessesList,
      inputMitigationsValue: mitigationsList,
      likelihood: likelihood,
      severity: severity,
    });
  };

  closeChangeAttackModal = () =>
    this.setState({
      isOpenChangeAttackModal: false,
      inputPrerequisitesValue: [],
      inputConsequencesValue: [],
      inputWeaknessesValue: [],
      inputMitigationsValue: [],
      likelihood: "0",
      severity: "0",
      attackName: "",
    });

  handleChangeLikelihood = (event) => {
    this.setState({ likelihood: event.target.value });
  };

  handleChangeSeverity = (event) => {
    this.setState({ severity: event.target.value });
  };

  upperCaseFirstLetter = (attackName) => {
    return attackName.charAt(0).toUpperCase() + attackName.slice(1);
  };

  lowerCaseFirstLetter = (attackName) => {
    return attackName.charAt(0).toLowerCase() + attackName.slice(1);
  };

  handleClickSnackBar = (message, snackbarType) => {
    this.setState({
      open: true,
      message: message,
      snackbarType: snackbarType,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  render() {
    const snackbar = (
      <Snackbar
        open={this.state.open}
        autoHideDuration={2500}
        onClose={this.handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={this.handleCloseSnackBar}
          severity={this.state.snackbarType}
        >
          {this.state.message}
        </Alert>
      </Snackbar>
    );

    const prerequisitesList = [
      { state: "target_relying_on_valid_GPS_signal" },
      {
        state:
          "target_communicating_on_a_network_protocol_visible_by_a_network_sniffing_application",
      },
      {
        state: "target_sender_recipient_adversary_must_be_on_same_subnet",
      },
      {
        state: "http_daemon_relies_on_cookies",
      },
      {
        state: "cookies_contain_sensitive_information",
      },
      { state: "cookie_is_contained_in_reply_to_adversary" },
      {
        state:
          "opportunity_to_intercept_must_exist_beyond_the_point_where_SSL_is_terminated",
      },
      {
        state: "insert_listener_actively_in_client_server_communication_path",
      },
      {
        state: "insert_listener_passively_in_client_server_communication_path",
      },
      {
        state:
          "attacker_must_have_ability_to_place_themself_in_the_communication_path_between_client_and_server",
      },
      {
        state: "targeted_application_must_receive_application_code_from_server",
      },
      {
        state:
          "attacker_must_be_able_to_employ_sniffer_on_the_network_without_being_detected",
      },
      {
        state: "attacker_must_have_knowledge_of_targets_mobile_phone_number",
      },
      {
        state:
          "on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges",
      },
      {
        state: "adversary_needs_logical_access_to_the_target_network",
      },
      {
        state:
          "requires_ability_to_connect_to_available_port_and_complete_three_way_handshake",
      },
      {
        state: "requires_the_use_of_raw_sockets",
      },
      {
        state:
          "no_special_privileges_when_it_is_performed_via_native_system_utility",
      },
      {
        state:
          "ability_to_send_UDP_datagrams_to_host_and_receive_ICMP_error_messages_from_that_host",
      },
      {
        state:
          "inproperly_authenticatation_prior_to_performing_decryption_operation",
      },
      {
        state:
          "targeted_system_must_have_multiple_stages_processing_of_XML_content",
      },
      {
        state: "targeted_software_is_utilizing_application_framework_APIs",
      },
      {
        state:
          "victim_and_the_attacker_are_in_environment_where_active_man_in_the_middle_attack_is_possible",
      },
      {
        state: "victim_visits_website_that_does_not_use_TLS_SSL",
      },
      {
        state: "expected_resource_to_be_available_to_user",
      },
      {
        state:
          "target_data_stream_must_be_transmitted_on_a_medium_to_which_the_adversary_has_access",
      },
      {
        state: "target_software_utilizes_some_sort_of_cryptographic_algorithm",
      },
      {
        state: "attacker_has_access_to_the_ciphertext",
      },
      {
        state: "attacker_must_have_direct_access_to_the_target_server",
      },
      {
        state:
          "server_that_has_an_implementation_that_accepts_entities_containing_URI_values",
      },
      {
        state: "physical_proximity_to_the_targets_environment",
      },
      {
        state: "attacker_has_some_access_to_the_system",
      },
      {
        state: "some_data_must_be_held_client_side",
      },
    ];

    var prerequisites = [{ state: "" }];
    for (let i = 0; i < prerequisitesList.length; i++) {
      const c = this.upperCaseFirstLetter(
        prerequisitesList[i].state
      ).replaceAll("_", " ");
      prerequisites.push({ state: c });
    }

    const consequencesList = [
      { state: "deny_availability_of_satellite_communications" },
      { state: "read_data" },
      { state: "modify_data" },
      { state: "gain_privileges" },
      { state: "bypass_protection_mechanism" },
      { state: "hide_activities" },
      { state: "unreliable_execution" },
      { state: "execute_unauthorized_commands" },
      { state: "resource_consumption" },
    ];

    var consequences = [{ state: "" }];
    for (let i = 0; i < consequencesList.length; i++) {
      const c = this.upperCaseFirstLetter(consequencesList[i].state).replaceAll(
        "_",
        " "
      );
      consequences.push({ state: c });
    }

    const weaknessesList = [
      { state: "insufficient_Verification_of_Data_Authenticity" },
      { state: "improper_Authentication" },
      { state: "channel_Accessible_by_Non_Endpoint" },
      { state: "exposure_of_Sensitive_Information_to_an_Unauthorized_Actor" },
      { state: "missing_Encryption_of_Sensitive_Data" },
      { state: "improper_Input_Validation" },
      { state: "cleartext_Storage_of_Sensitive_Information_in_a_Cookie" },
      { state: "session_Fixation" },
      { state: "broken_Authentication_and_Session_Management" },
      { state: "client_Side_Enforcement_of_Server_Side_Security" },
      { state: "external_Control_of_Critical_State_Data" },
      { state: "cleartext_Transmission_of_Sensitive_Information" },
      { state: "cleartext_Storage_of_Sensitive_Information_in_Executable" },
      { state: "protection_Mechanism_Failure" },
      { state: "insecure_Cryptographic_Storage" },
      { state: "privilege_Defined_With_Unsafe_Actions" },
      { state: "insertion_of_Sensitive_Information_Into_Sent_Data" },
      { state: "generation_of_Error_Message_Containing_Sensitive_Information" },
      { state: "covert_Channel" },
      { state: "improper_Verification_of_Cryptographic_Signature" },
      { state: "improper_Validation_of_Integrity_Check_Value" },
      { state: "incorrect_Behavior_Order" },
      { state: "use_of_a_Broken_or_Risky_Cryptographic_Algorithm" },
      { state: "unintended_Proxy_or_Intermediary" },
      {
        state:
          "externally_Controlled_Reference_to_a_Resource_in_Another_Sphere",
      },
      { state: "modification_of_Assumed_Immutable_Data_MAID" },
      { state: "origin_Validation_Error" },
      { state: "missing_Support_for_Integrity_Check" },
      { state: "use_of_a_Risky_Cryptographic_Primitive" },
      { state: "use_of_Predictable_Algorithm_in_Random_Number_Generator" },
      {
        state:
          "cryptographic_Operations_are_run_Before_Supporting_Units_are_Ready",
      },
      { state: "incorrect_Implementation_of_Authentication_Algorithm" },
      { state: "improper_Restriction_of_XML_External_Entity_Reference" },
      { state: "improper_Authorization" },
      { state: "improper_Handling_of_Parameters" },
    ];

    var weaknesses = [{ state: "" }];
    for (let i = 0; i < weaknessesList.length; i++) {
      const c = this.upperCaseFirstLetter(weaknessesList[i].state).replaceAll(
        "_",
        " "
      );
      weaknesses.push({ state: c });
    }

    const mitigationsList = [
      {
        state:
          "commercial_defensive_technology_that_monitors_for_rogue_WiFi_access_points_man_in_the_middle_attacks_and_anomalous_activity_with_the_mobile_device_baseband_radios",
      },
      {
        state:
          "passively_monitor_cellular_network_connection_for_real_time_threat_detection_and_logging_for_manual_review",
      },
      {
        state:
          "obfuscate_network_traffic_through_encryption_to_prevent_its_readability_by_network_sniffers",
      },
      {
        state:
          "employ_appropriate_levels_of_segmentation_to_your_network_in_accordance_with_best_practices",
      },
      { state: "validation_for_cookies" },
      { state: "generate_and_validate_MAC_for_cookies" },
      { state: "use_SSL_TLS_to_protect_cookie_in_transit" },
      {
        state: "ensure_the_web_server_implements_all_relevant_security_patches",
      },
      {
        state:
          "implement_message_level_security_such_as_HMAC_in_the_HTTP_communication",
      },
      {
        state:
          "utilize_defense_in_depth_do_not_rely_on_single_security_mechanism_like_SSL",
      },
      { state: "enforce_principle_of_least_privilege" },
      {
        state:
          "encryption_of_data_packets_emanating_from_smartphone_to_retransmission_device_with_Suite_B_cryptography",
      },
      {
        state:
          "use_SSL_SSH_SCP_to_encrypt_all_communication_between_client_and_server",
      },
      {
        state:
          "use_allowlist_policy_to_prevent_unknown_code_from_executing_on_system",
      },
      {
        state:
          "patch_installed_applications_as_soon_as_new_updates_become_available",
      },
      { state: "automatic_randomization_of_WiFi_MAC_addresses" },
      { state: "frequent_changing_of_handset_and_retransmission_device" },
      { state: "do_not_enable_the_feature_of_Hidden_SSIDs" },
      { state: "frequently_change_SSID_to_new_and_unrelated_values" },
      { state: "frequent_changing_of_mobile_number" },
      {
        state:
          "employ_robust_network_defense_posture_that_includes_IDS_IPS_system",
      },
      { state: "use_IDS_IPS_system_with_heuristic_algorithms" },
      {
        state:
          "employ_robust_network_defensive_posture_that_includes_managed_IDS_IP",
      },
      { state: "use_firewalls_or_ACLs_which_block_egress_ICMP_error_types" },
      {
        state:
          "use_message_authentication_code_or_another_mechanism_to_perform_verification_of_message_authenticity_or_integrity_prior_to_decryption",
      },
      {
        state:
          "do_not_leak_information_back_to_user_as_to_any_cryptography_encountered_during_decryption",
      },
      {
        state:
          "use_of_hardened_baseband_firmware_on_retransmission_device_to_detect_and_prevent_the_use_of_weak_cellular_encryption",
      },
      {
        state:
          "monitor_cellular_RF_interface_to_detect_the_usage_of_weaker_than_expected_cellular_encryption",
      },
      {
        state:
          "specify_maximum_number_intermediate_nodes_for_the_request_and_require_SSL_connections_with_mutual_authentication",
      },
      {
        state:
          "use_SSL_for_connections_between_all_parties_with_mutual_authentication",
      },
      { state: "tunnel_communications_through_secure_proxy" },
      {
        state:
          "trust_level_separation_for_privileged_or_non_privileged_interactions",
      },
      {
        state:
          "encrypt_sensitive_information_when_transmitted_on_insecure_mediums_to_prevent_interception",
      },
      {
        state: "use_proven_cryptographic_algorithms_with_recommended_key_sizes",
      },
      { state: "ensure_that_the_algorithms_are_used_properly" },
      { state: "server_must_initiate_handshake_by_issuing_challenge" },
      { state: "introducing_a_random_nonce_with_each_new_connection" },
      {
        state:
          "implement_custom_resolver_that_has_request_timeout_and_restrict_resources_it_can_retrieve_locally",
      },
      {
        state:
          "use_of_antivirus_and_other_security_monitoring_and_detecting_tools",
      },
      { state: "physically_disable_microphone_on_your_machine" },
      {
        state:
          "protect_client_side_authentication_tokens_for_confidentiality_and_integrity",
      },
      { state: "make_sure_that_session_tokens_use_good_source_of_randomness" },
      { state: "perform_validation_on_the_server_side" },
    ];

    var mitigations = [{ state: "" }];
    for (let i = 0; i < mitigationsList.length; i++) {
      const c = this.upperCaseFirstLetter(mitigationsList[i].state).replaceAll(
        "_",
        " "
      );
      mitigations.push({ state: c });
    }

    const tableRows = this.state.attacks.map((attack, key) => {
      return (
        <tr id={key}>
          <th scope="row">{attack.id}</th>
          <td>{attack.name}</td>
          <td>{attack.likelihood}</td>
          <td>{attack.severity}</td>
          <td>{attack.prerequisites.name}</td>
          <td>{attack.consequences.name}</td>
          <td>{attack.weaknesses.name}</td>
          <td>{attack.mitigations.name}</td>
          <td>
            <div class="action">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.openChangeAttackModal(attack);
                }}
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
                href="javascript:void(0)"
                onClick={() => {
                  this.deleteAttack(attack.name);
                }}
                class="text-danger mr-4"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Close"
              >
                {" "}
                <i class="fa fa-trash-alt"></i>
              </a>
            </div>
          </td>
        </tr>
      );
    });

    const newAttackModalDialog = (
      <Modal
        show={this.state.isOpenNewAttackModal}
        onHide={this.closeNewAttackModal}
        size="lg"
        style={{ height: "720px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "315px", color: "#74767a" }}>
            New attack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "620px",
          }}
        >
          <div
            style={{
              marginLeft: "75px",
            }}
          >
            <h4 style={{ textAlign: "left", color: "#74767a" }}>
              Choose attack characteristics:
            </h4>
            <br />

            <Grid container spacing={5}>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputPrerequisitesValue}
                  id="prerequisites"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputPrerequisitesValue: uniqueArray },
                      () => {
                        console.log(this.state.inputPrerequisitesValue);
                      }
                    );
                  }}
                  options={prerequisites}
                  getOptionLabel={(option) => option.state}
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Prerequisites"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputConsequencesValue}
                  id="consequences"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputConsequencesValue: uniqueArray },
                      () => {
                        console.log(this.state.inputConsequencesValue);
                      }
                    );
                  }}
                  options={consequences}
                  getOptionLabel={(option) => option.state}
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Consequences"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputWeaknessesValue}
                  id="weaknesses"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });
                    this.setState({ inputWeaknessesValue: uniqueArray }, () => {
                      console.log(this.state.inputWeaknessesValue);
                    });
                  }}
                  options={weaknesses}
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
                  value={this.state.inputMitigationsValue}
                  id="mitigations"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputMitigationsValue: uniqueArray },
                      () => {
                        console.log(this.state.inputMitigationsValue);
                      }
                    );
                  }}
                  options={mitigations}
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
            <br />
            <Grid container spacing={5}>
              <Grid item xs>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Likelihood</FormLabel>
                  <RadioGroup
                    aria-label="interactingWithSystem"
                    name="interactingWithSystem"
                    value={this.state.likelihood}
                    onChange={this.handleChangeLikelihood}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Severity</FormLabel>
                  <RadioGroup
                    aria-label="interactingWithSystem"
                    name="interactingWithSystem"
                    value={this.state.severity}
                    onChange={this.handleChangeSeverity}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <div class="graph-star-rating-footer text-center mt-4 mb-3">
              <button
                type="button"
                onClick={this.addAttack}
                class="btn btn-outline-primary btn-sm"
                style={{
                  width: "120px",
                  fontSize: "17px",
                  marginRight: "65px",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeNewAttackModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const changeAttackModalDialog = (
      <Modal
        show={this.state.isOpenChangeAttackModal}
        onHide={this.closeChangeAttackModal}
        size="lg"
        style={{ height: "720px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "300px", color: "#74767a" }}>
            Change attack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "620px",
          }}
        >
          <div
            style={{
              marginLeft: "75px",
            }}
          >
            <h4 style={{ textAlign: "left", color: "#74767a" }}>
              Choose attack characteristics:
            </h4>
            <br />

            <Grid container spacing={5}>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputPrerequisitesValue}
                  id="prerequisites"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputPrerequisitesValue: uniqueArray },
                      () => {
                        console.log(this.state.inputPrerequisitesValue);
                      }
                    );
                  }}
                  options={prerequisites}
                  getOptionLabel={(option) => option.state}
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Prerequisites"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputConsequencesValue}
                  id="consequences"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputConsequencesValue: uniqueArray },
                      () => {
                        console.log(this.state.inputConsequencesValue);
                      }
                    );
                  }}
                  options={consequences}
                  getOptionLabel={(option) => option.state}
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Consequences"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  value={this.state.inputWeaknessesValue}
                  id="weaknesses"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });
                    this.setState({ inputWeaknessesValue: uniqueArray }, () => {
                      console.log(this.state.inputWeaknessesValue);
                    });
                  }}
                  options={weaknesses}
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
                  value={this.state.inputMitigationsValue}
                  id="mitigations"
                  onChange={(event, newInputValue) => {
                    const uniqueArray = newInputValue.filter((state, index) => {
                      const _thing = JSON.stringify(state);
                      return (
                        index ===
                        newInputValue.findIndex((obj) => {
                          return JSON.stringify(obj) === _thing;
                        })
                      );
                    });

                    this.setState(
                      { inputMitigationsValue: uniqueArray },
                      () => {
                        console.log(this.state.inputMitigationsValue);
                      }
                    );
                  }}
                  options={mitigations}
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
            <br />
            <Grid container spacing={5}>
              <Grid item xs>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Likelihood</FormLabel>
                  <RadioGroup
                    aria-label="interactingWithSystem"
                    name="interactingWithSystem"
                    value={this.state.likelihood}
                    onChange={this.handleChangeLikelihood}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Severity</FormLabel>
                  <RadioGroup
                    aria-label="interactingWithSystem"
                    name="interactingWithSystem"
                    value={this.state.severity}
                    onChange={this.handleChangeSeverity}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <div class="graph-star-rating-footer text-center mt-4 mb-3">
              <button
                type="button"
                onClick={this.changeAttack}
                class="btn btn-outline-primary btn-sm"
                style={{
                  width: "120px",
                  fontSize: "17px",
                  marginRight: "55px",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeChangeAttackModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {newAttackModalDialog}
        {changeAttackModalDialog}
        {snackbar}
        <div class="container" style={{ maxWidth: "100%" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive project-list">
                    <div class="graph-star-rating-footer text-center ">
                      <h4
                        style={{
                          textAlign: "center",
                          marginLeft: "110px",
                          color: "#74767a",
                          paddingBottom: "20px",
                        }}
                      >
                        Attacks overview
                        <button
                          type="button"
                          onClick={() => {
                            this.openNewAttackModal();
                          }}
                          class="btn btn-outline-primary btn-sm"
                          style={{
                            width: "120px",
                            fontSize: "17px",
                            float: "right",
                          }}
                        >
                          New attack
                        </button>
                      </h4>
                    </div>
                    <table class="table project-table table-centered table-nowrap fixed_header">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col" style={{ minWidth: "110px" }}>
                            Attack name
                          </th>
                          <th scope="col">Likelihood</th>
                          <th scope="col">Severity</th>
                          <th scope="col">Prerequisites</th>
                          <th scope="col">Consequences</th>
                          <th scope="col">Weaknesses</th>
                          <th scope="col">Mitigations</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>{tableRows}</tbody>
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
