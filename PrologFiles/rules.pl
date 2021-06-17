attack(carryOff_GPS_Attack).
likelihood(carryOff_GPS_Attack, low).
severity(carryOff_GPS_Attack, high).
prerequisites(carryOff_GPS_Attack, [target_relying_on_valid_GPS_signal]).
consequences(carryOff_GPS_Attack, [unspecified]).
weaknesses(carryOff_GPS_Attack, [insufficient_Verification_of_Data_Authenticity]).
mitigations(carryOff_GPS_Attack, [unspecified]).

attack(terrestrial_Jamming).
likelihood(terrestrial_Jamming, low).
severity(terrestrial_Jamming, high).
prerequisites(terrestrial_Jamming, [none]).
consequences(terrestrial_Jamming, [deny_availability_of_satellite_communications]).
weaknesses(terrestrial_Jamming, [improper_Authentication]).
mitigations(terrestrial_Jamming, [unspecified]).

attack(evil_Twin_WiFi_Attack).
likelihood(evil_Twin_WiFi_Attack, medium).
severity(evil_Twin_WiFi_Attack, low).
prerequisites(evil_Twin_WiFi_Attack, [none]).
consequences(evil_Twin_WiFi_Attack, [read_data]).
weaknesses(evil_Twin_WiFi_Attack, [channel_Accessible_by_Non_Endpoint]).
mitigations(evil_Twin_WiFi_Attack, [commercial_defensive_technology_that_monitors_for_rogue_WiFi_access_points_man_in_the_middle_attacks_and_anomalous_activity_with_the_mobile_device_baseband_radios]).

attack(cellular_Rogue_Base_Station).
likelihood(cellular_Rogue_Base_Station, low).
severity(cellular_Rogue_Base_Station, low).
prerequisites(cellular_Rogue_Base_Station, [none]).
consequences(cellular_Rogue_Base_Station, [read_data]).
weaknesses(cellular_Rogue_Base_Station, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(cellular_Rogue_Base_Station, [passively_monitor_cellular_network_connection_for_real_time_threat_detection_and_logging_for_manual_review]).

attack(sniffing_Network_Traffic).
likelihood(sniffing_Network_Traffic, high).
severity(sniffing_Network_Traffic, medium).
prerequisites(sniffing_Network_Traffic, [target_communicating_on_a_network_protocol_visible_by_a_network_sniffing_application, target_sender_recipient_adversary_must_be_on_same_subnet]).
consequences(sniffing_Network_Traffic, [read_data]).
weaknesses(sniffing_Network_Traffic, [missing_Encryption_of_Sensitive_Data]).
mitigations(sniffing_Network_Traffic, [obfuscate_network_traffic_through_encryption_to_prevent_its_readability_by_network_sniffers, employ_appropriate_levels_of_segmentation_to_your_network_in_accordance_with_best_practices]).

attack(accessing_Intercepting_Modifying_HTTP_Cookies).
likelihood(accessing_Intercepting_Modifying_HTTP_Cookies, high).
severity(accessing_Intercepting_Modifying_HTTP_Cookies, high).
prerequisites(accessing_Intercepting_Modifying_HTTP_Cookies, [http_daemon_relies_on_cookies, cookies_contain_sensitive_information, cookie_is_contained_in_reply_to_adversary]).
consequences(accessing_Intercepting_Modifying_HTTP_Cookies, [read_data, modify_data, gain_privileges]).
weaknesses(accessing_Intercepting_Modifying_HTTP_Cookies, [missing_Encryption_of_Sensitive_Data, improper_Input_Validation, cleartext_Storage_of_Sensitive_Information_in_a_Cookie, session_Fixation, broken_Authentication_and_Session_Management, client_Side_Enforcement_of_Server_Side_Security, external_Control_of_Critical_State_Data]).
mitigations(accessing_Intercepting_Modifying_HTTP_Cookies, [validation_for_cookies, generate_and_validate_MAC_for_cookies, use_SSL_TLS_to_protect_cookie_in_transit, ensure_the_web_server_implements_all_relevant_security_patches]).

attack(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data).
likelihood(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, medium).
severity(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, high).
prerequisites(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, [opportunity_to_intercept_must_exist_beyond_the_point_where_SSL_is_terminated, insert_listener_actively_in_client_server_communication_path, insert_listener_passively_in_client_server_communication_path]).
consequences(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, [gain_privileges]).
weaknesses(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, [channel_Accessible_by_Non_Endpoint, improper_Authentication, broken_Authentication_and_Session_Management, protection_Mechanism_Failure]). 
mitigations(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, [implement_message_level_security_such_as_HMAC_in_the_HTTP_communication, utilize_defense_in_depth_do_not_rely_on_single_security_mechanism_like_SSL, enforce_principle_of_least_privilege]).

attack(cellular_Traffic_Intercept).
likelihood(cellular_Traffic_Intercept, medium).
severity(cellular_Traffic_Intercept, low).
prerequisites(cellular_Traffic_Intercept, [none]).
consequences(cellular_Traffic_Intercept, [read_data]).
weaknesses(cellular_Traffic_Intercept, [missing_Encryption_of_Sensitive_Data]).
mitigations(cellular_Traffic_Intercept, [encryption_of_data_packets_emanating_from_smartphone_to_retransmission_device_with_Suite_B_cryptography]).

attack(sniff_Application_Code).
likelihood(sniff_Application_Code, low).
severity(sniff_Application_Code, high).
prerequisites(sniff_Application_Code, [attacker_must_have_ability_to_place_themself_in_the_communication_path_between_client_and_server, targeted_application_must_receive_application_code_from_server, attacker_must_be_able_to_employ_sniffer_on_the_network_without_being_detected]).
consequences(sniff_Application_Code, [read_data, gain_privileges]).
weaknesses(sniff_Application_Code, [cleartext_Transmission_of_Sensitive_Information, missing_Encryption_of_Sensitive_Data, cleartext_Storage_of_Sensitive_Information_in_Executable, protection_Mechanism_Failure, insecure_Cryptographic_Storage]).
mitigations(sniff_Application_Code, [use_SSL_SSH_SCP_to_encrypt_all_communication_between_client_and_server]).

attack(probe_Audio_and_Video_Peripherals).
likelihood(probe_Audio_and_Video_Peripherals, low).
severity(probe_Audio_and_Video_Peripherals, high).
prerequisites(probe_Audio_and_Video_Peripherals, [knowledge_of_target_devices_or_application_vulnerabilities, adversary_must_be_able_to_place_malicious_code_on_the_target_device]).
consequences(probe_Audio_and_Video_Peripherals, [read_data]).
weaknesses(probe_Audio_and_Video_Peripherals, [privilege_Defined_With_Unsafe_Actions]).
mitigations(probe_Audio_and_Video_Peripherals, [use_allowlist_policy_to_prevent_unknown_code_from_executing_on_system, patch_installed_applications_as_soon_as_new_updates_become_available]).

attack(wiFi_MAC_Address_Tracking).
likelihood(wiFi_MAC_Address_Tracking, low).
severity(wiFi_MAC_Address_Tracking, low).
prerequisites(wiFi_MAC_Address_Tracking, [none]).
consequences(wiFi_MAC_Address_Tracking, [unspecified]).
weaknesses(wiFi_MAC_Address_Tracking, [insertion_of_Sensitive_Information_Into_Sent_Data, channel_Accessible_by_Non_Endpoint]).
mitigations(wiFi_MAC_Address_Tracking, [automatic_randomization_of_WiFi_MAC_addresses, frequent_changing_of_handset_and_retransmission_device]).

attack(wiFi_SSID_Tracking).
likelihood(wiFi_SSID_Tracking, medium).
severity(wiFi_SSID_Tracking, low).
prerequisites(wiFi_SSID_Tracking, [none]).
consequences(wiFi_SSID_Tracking, [unspecified]).
weaknesses(wiFi_SSID_Tracking, [insertion_of_Sensitive_Information_Into_Sent_Data, channel_Accessible_by_Non_Endpoint]).
mitigations(wiFi_SSID_Tracking, [do_not_enable_the_feature_of_Hidden_SSIDs, frequently_change_SSID_to_new_and_unrelated_values]).

attack(cellular_Broadcast_Message_Request).
likelihood(cellular_Broadcast_Message_Request, high).
severity(cellular_Broadcast_Message_Request, low).
prerequisites(cellular_Broadcast_Message_Request, [attacker_must_have_knowledge_of_targets_mobile_phone_number]).
consequences(cellular_Broadcast_Message_Request, [unspecified]).
weaknesses(cellular_Broadcast_Message_Request, [insertion_of_Sensitive_Information_Into_Sent_Data]).
mitigations(cellular_Broadcast_Message_Request, [frequent_changing_of_mobile_number]).

attack(signal_Strength_Tracking).
likelihood(signal_Strength_Tracking, high).
severity(signal_Strength_Tracking, low).
prerequisites(signal_Strength_Tracking, [none]).
consequences(signal_Strength_Tracking, [unspecified]).
weaknesses(signal_Strength_Tracking, [insertion_of_Sensitive_Information_Into_Sent_Data]).
mitigations(signal_Strength_Tracking, [unspecified]).

attack(tcp_SYN_Scan).
likelihood(tcp_SYN_Scan, high).
severity(tcp_SYN_Scan, low).
prerequisites(tcp_SYN_Scan, [on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_SYN_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_SYN_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_SYN_Sca, [unspecified]).

attack(tcp_Connect_Scan).
likelihood(tcp_Connect_Scan, high).
severity(tcp_Connect_Scan, low).
prerequisites(tcp_Connect_Scan, [adversary_needs_logical_access_to_the_target_network, requires_ability_to_connect_to_available_port_and_complete_three_way_handshake]).
consequences(tcp_Connect_Scan, [read_data]).
weaknesses(tcp_Connect_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_Connect_Scan, [employ_robust_network_defense_posture_that_includes_IDS_IPS_system]).

attack(tcp_FIN_Scan).
likelihood(tcp_FIN_Scan, medium).
severity(tcp_FIN_Scan, low).
prerequisites(tcp_FIN_Scan, [on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_FIN_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_FIN_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_FIN_Scan, [use_IDS_IPS_system_with_heuristic_algorithms]).

attack(tcp_Xmas_Scan).
likelihood(tcp_Xmas_Scan, medium).
severity(tcp_Xmas_Scan, low).
prerequisites(tcp_Xmas_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_Xmas_Scan, [bypass_protection_mechanism, hide_activities, unreliable_execution]).
weaknesses(tcp_Xmas_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_Xmas_Scan, [employ_robust_network_defensive_posture_that_includes_managed_IDS_IP]).

attack(tcp_Null_Scan).
likelihood(tcp_Null_Scan, medium).
severity(tcp_Null_Scan, low).
prerequisites(tcp_Null_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_Null_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_Null_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_Null_Scan, [employ_robust_network_defensive_posture_that_includes_managed_IDS_IP]).

attack(tcp_ACK_Scan).
likelihood(tcp_ACK_Scan, medium).
severity(tcp_ACK_Scan, low).
prerequisites(tcp_ACK_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_ACK_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_ACK_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_ACK_Scan, [unspecified]).

attack(tcp_Window_Scan).
likelihood(tcp_Window_Scan, medium).
severity(tcp_Window_Scan, low).
prerequisites(tcp_Window_Scan, [requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
consequences(tcp_Window_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_Window_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_Window_Sca, [unspecified]).

attack(tcp_RPC_Scan).
likelihood(tcp_RPC_Scan, medium).
severity(tcp_RPC_Scan, low).
prerequisites(tcp_RPC_Scan, [no_special_privileges_when_it_is_performed_via_native_system_utility]).
consequences(tcp_RPC_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(tcp_RPC_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(tcp_RPC_Scan, [use_IDS_IPS_system]).

attack(udp_Scan).
likelihood(udp_Scan, medium).
severity(udp_Scan, low).
prerequisites(udp_Scan, [ability_to_send_UDP_datagrams_to_host_and_receive_ICMP_error_messages_from_that_host]).
consequences(udp_Scan, [bypass_protection_mechanism, hide_activities]).
weaknesses(udp_Scan, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(udp_Scan, [use_firewalls_or_ACLs_which_block_egress_ICMP_error_types]).

attack(padding_Oracle_Crypto_Attack).
likelihood(padding_Oracle_Crypto_Attack, low).
severity(padding_Oracle_Crypto_Attack, high).
prerequisites(padding_Oracle_Crypto_Attack, [inproperly_authenticatation_prior_to_performing_decryption_operation]).
consequences(padding_Oracle_Crypto_Attack, [unspecified]).
weaknesses(padding_Oracle_Crypto_Attack, [generation_of_Error_Message_Containing_Sensitive_Information, covert_Channel, improper_Verification_of_Cryptographic_Signature, improper_Validation_of_Integrity_Check_Value, incorrect_Behavior_Order]).
mitigations(padding_Oracle_Crypto_Attack, [use_message_authentication_code_or_another_mechanism_to_perform_verification_of_message_authenticity_or_integrity_prior_to_decryption, do_not_leak_information_back_to_user_as_to_any_cryptography_encountered_during_decryption]).

attack(cryptanalysis_of_Cellular_Encryption).
likelihood(cryptanalysis_of_Cellular_Encryption, high).
severity(cryptanalysis_of_Cellular_Encryption, high).
prerequisites(cryptanalysis_of_Cellular_Encryption, [none]).
consequences(cryptanalysis_of_Cellular_Encryption, [unspecified]).
weaknesses(cryptanalysis_of_Cellular_Encryption, [use_of_a_Broken_or_Risky_Cryptographic_Algorithm]).
mitigations(cryptanalysis_of_Cellular_Encryption, [use_of_hardened_baseband_firmware_on_retransmission_device_to_detect_and_prevent_the_use_of_weak_cellular_encryption, monitor_cellular_RF_interface_to_detect_the_usage_of_weaker_than_expected_cellular_encryption]).

attack(xml_Routing_Detour_Attacks).
likelihood(xml_Routing_Detour_Attacks, high).
severity(xml_Routing_Detour_Attacks, medium).
prerequisites(xml_Routing_Detour_Attacks, [targeted_system_must_have_multiple_stages_processing_of_XML_content]).
consequences(xml_Routing_Detour_Attacks, [modify_data, read_data, gain_privileges, bypass_protection_mechanism]).
weaknesses(xml_Routing_Detour_Attacks, [unintended_Proxy_or_Intermediary, externally_Controlled_Reference_to_a_Resource_in_Another_Sphere]).
mitigations(xml_Routing_Detour_Attacks, [specify_maximum_number_intermediate_nodes_for_the_request_and_require_SSL_connections_with_mutual_authentication, use_SSL_for_connections_between_all_parties_with_mutual_authentication]).

attack(transaction_or_Event_Tampering_via_Application_API_Manipulation).
likelihood(transaction_or_Event_Tampering_via_Application_API_Manipulation, medium).
severity(transaction_or_Event_Tampering_via_Application_API_Manipulation, medium).
prerequisites(transaction_or_Event_Tampering_via_Application_API_Manipulation, [targeted_software_is_utilizing_application_framework_APIs]).
consequences(transaction_or_Event_Tampering_via_Application_API_Manipulation, [unspecified]).
weaknesses(transaction_or_Event_Tampering_via_Application_API_Manipulation, [modification_of_Assumed_Immutable_Data_MAID, insufficient_Verification_of_Data_Authenticity, origin_Validation_Error, client_Side_Enforcement_of_Server_Side_Security, missing_Encryption_of_Sensitive_Data]).
mitigations(transaction_or_Event_Tampering_via_Application_API_Manipulation, [unspecified]).

attack(content_Spoofing_Via_Application_API_Manipulation).
likelihood(content_Spoofing_Via_Application_API_Manipulation, low).
severity(content_Spoofing_Via_Application_API_Manipulation, low).
prerequisites(content_Spoofing_Via_Application_API_Manipulation, [targeted_software_is_utilizing_application_framework_APIs]).
consequences(content_Spoofing_Via_Application_API_Manipulation, [unspecified]).
weaknesses(content_Spoofing_Via_Application_API_Manipulation, [missing_Support_for_Integrity_Check]).
mitigations(content_Spoofing_Via_Application_API_Manipulation, [unspecified]).

attack(navigation_Remapping_To_Propagate_Malicious_Content).
likelihood(navigation_Remapping_To_Propagate_Malicious_Content, high).
severity(navigation_Remapping_To_Propagate_Malicious_Content, medium).
prerequisites(navigation_Remapping_To_Propagate_Malicious_Content, [targeted_software_is_utilizing_application_framework_APIs]).
consequences(navigation_Remapping_To_Propagate_Malicious_Content, [unspecified]).
weaknesses(navigation_Remapping_To_Propagate_Malicious_Content, [modification_of_Assumed_Immutable_Data_MAID, insufficient_Verification_of_Data_Authenticity, origin_Validation_Error, client_Side_Enforcement_of_Server_Side_Security, missing_Encryption_of_Sensitive_Data]).
mitigations(navigation_Remapping_To_Propagate_Malicious_Content, [unspecified]).

attack(aplication_API_Button_Hijacking).
likelihood(aplication_API_Button_Hijacking, high).
severity(aplication_API_Button_Hijacking, medium).
prerequisites(aplication_API_Button_Hijacking, [targeted_software_is_utilizing_application_framework_APIs]).
consequences(aplication_API_Button_Hijacking, [unspecified]).
weaknesses(aplication_API_Button_Hijacking, [modification_of_Assumed_Immutable_Data_MAID, insufficient_Verification_of_Data_Authenticity, origin_Validation_Error, client_Side_Enforcement_of_Server_Side_Security, missing_Encryption_of_Sensitive_Data]).
mitigations(aplication_API_Button_Hijacking, [unspecified]).

attack(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy).
likelihood(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, medium).
severity(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, medium).
prerequisites(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [victim_and_the_attacker_are_in_environment_where_active_man_in_the_middle_attack_is_possible, victim_visits_website_that_does_not_use_TLS_SSL]).
consequences(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [read_data, execute_unauthorized_commands]).
weaknesses(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [channel_Accessible_by_Non_Endpoint]).
mitigations(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [tunnel_communications_through_secure_proxy, trust_level_separation_for_privileged_or_non_privileged_interactions]).

attack(establish_Rogue_Location).
likelihood(establish_Rogue_Location, medium).
severity(establish_Rogue_Location, medium).
prerequisites(establish_Rogue_Location, [expected_resource_to_be_available_to_user]).
consequences(establish_Rogue_Location, [read_data]).
weaknesses(establish_Rogue_Location, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(establish_Rogue_Location, [passively_monitor_cellular_network_connection_for_real_time_threat_detection_and_logging_for_manual_review]).

attack(sniffing_Attacks).
likelihood(sniffing_Attacks, medium).
severity(sniffing_Attacks, medium).
prerequisites(sniffing_Attacks, [target_data_stream_must_be_transmitted_on_a_medium_to_which_the_adversary_has_access]).
consequences(sniffing_Attacks, [read_data]).
weaknesses(sniffing_Attacks, [missing_Encryption_of_Sensitive_Data]).
mitigations(sniffing_Attacks, [encrypt_sensitive_information_when_transmitted_on_insecure_mediums_to_prevent_interception]).

attack(cryptanalysis).
likelihood(cryptanalysis, low).
severity(cryptanalysis, high).
prerequisites(cryptanalysis, [target_software_utilizes_some_sort_of_cryptographic_algorithm, attacker_has_access_to_the_ciphertext]).
consequences(cryptanalysis, [read_data]).
weaknesses(cryptanalysis, [use_of_a_Broken_or_Risky_Cryptographic_Algorithm, use_of_a_Risky_Cryptographic_Primitive, use_of_Predictable_Algorithm_in_Random_Number_Generator, cryptographic_Operations_are_run_Before_Supporting_Units_are_Ready]).
mitigations(cryptanalysis, [use_proven_cryptographic_algorithms_with_recommended_key_sizes, ensure_that_the_algorithms_are_used_properly]).

attack(reflection_Attack_in_Authentication_Protocol).
likelihood(reflection_Attack_in_Authentication_Protocol, high).
severity(reflection_Attack_in_Authentication_Protocol, high).
prerequisites(reflection_Attack_in_Authentication_Protocol, [attacker_must_have_direct_access_to_the_target_server]).
consequences(reflection_Attack_in_Authentication_Protocol, [gain_privileges, bypass_protection_mechanism, read_data]).
weaknesses(reflection_Attack_in_Authentication_Protocol, [broken_Authentication_and_Session_Management, incorrect_Implementation_of_Authentication_Algorithm]).
mitigations(reflection_Attack_in_Authentication_Protocol, [server_must_initiate_handshake_by_issuing_challenge, introducing_a_random_nonce_with_each_new_connection]).

attack(data_Serialization_External_Entities_Blowup).
likelihood(data_Serialization_External_Entities_Blowup, high).
severity(data_Serialization_External_Entities_Blowup, medium).
prerequisites(data_Serialization_External_Entities_Blowup, [server_that_has_an_implementation_that_accepts_entities_containing_URI_values]).
consequences(data_Serialization_External_Entities_Blowup, [execute_unauthorized_commands, resource_consumption]).
weaknesses(data_Serialization_External_Entities_Blowup, [improper_Restriction_of_XML_External_Entity_Reference]).
mitigations(data_Serialization_External_Entities_Blowup, [implement_custom_resolver_that_has_request_timeout_and_restrict_resources_it_can_retrieve_locally]).

attack(eavesdropping).
likelihood(eavesdropping, low).
severity(eavesdropping, medium).
prerequisites(eavesdropping, [physical_proximity_to_the_targets_environment]).
consequences(eavesdropping, [read_data]).
weaknesses(eavesdropping, [exposure_of_Sensitive_Information_to_an_Unauthorized_Actor]).
mitigations(eavesdropping, [use_of_antivirus_and_other_security_monitoring_and_detecting_tools, physically_disable_the_microphone_on_your_machine]).

attack(manipulating_Opaque_Client_based_Data_Tokens).
likelihood(manipulating_Opaque_Client_based_Data_Tokens, high).
severity(manipulating_Opaque_Client_based_Data_Tokens, medium).
prerequisites(manipulating_Opaque_Client_based_Data_Tokens, [attacker_has_some_access_to_the_system, some_data_must_be_held_client_side]).
consequences(manipulating_Opaque_Client_based_Data_Tokens, [modify_data, gain_privileges]).
weaknesses(manipulating_Opaque_Client_based_Data_Tokens, [missing_Support_for_Integrity_Check, cleartext_Storage_of_Sensitive_Information_in_a_Cookie, improper_Authorization, session_Fixation, improper_Handling_of_Parameters]).
mitigations(manipulating_Opaque_Client_based_Data_Tokens, [protect_client_side_authentication_tokens_for_confidentiality_and_integrity, make_sure_that_session_tokens_use_good_source_of_randomness, perform_validation_on_the_server_side]).

% Suggested measures based on attack name
suggestions_by_name(Attack,Suggestions) :- mitigations(Attack,Suggestions), attack(Attack).

contains(S,[]).
contains(S,[H|T]) :- member(H,S), contains(S,T).

% Suggested measures based on attack weaknesses
suggestions_by_weaknesses(Weaknesses,Suggestions) :- weaknesses(Attack,W), contains(W,Weaknesses), suggestions_by_name(Attack,Suggestions).
%attack_by_weaknesses(Weaknesses,Attack) :- weaknesses(Attack,W), contains(W,Weaknesses).

% Suggested measures based on attack consequences
suggestions_by_consequences(Consequences,Suggestions) :- consequences(Attack,C), contains(C,Consequences), suggestions_by_name(Attack,Suggestions).
%attack_by_consequences(Consequenceses,Attack) :- consequences(Attack,C), contains(C,Consequences).

% Suggested measures based on attack prerequisites
suggestions_by_prerequisites(Prerequisites,Suggestions) :- prerequisites(Attack,P), contains(P,Prerequisites), suggestions_by_name(Attack,Suggestions).
%attack_by_prerequisites(Prerequisites,Attack) :- prerequisites(Attack,P), contains(P,Prerequisites).


