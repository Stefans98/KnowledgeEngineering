prerequisites(carryOff_GPS_Attack, [target_relying_on_valid_GPS_signal]).
prerequisites(terrestrial_Jamming, [none]).
prerequisites(evil_Twin_WiFi_Attack, [none]).
prerequisites(cellular_Rogue_Base_Station, [none]).
prerequisites(sniffing_Network_Traffic, [target_communicating_on_a_network_protocol_visible_by_a_network_sniffing_application, target_sender_recipient_adversary_must_be_on_same_subnet]).
prerequisites(accessing_Intercepting_Modifying_HTTP_Cookies, [http_daemon_relies_on_cookies, cookies_contain_sensitive_information, cookie_is_contained_in_reply_to_adversary]).
prerequisites(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, [opportunity_to_intercept_must_exist_beyond_the_point_where_SSL_is_terminated, insert_listener_actively_in_client_server_communication_path, insert_listener_passively_in_client_server_communication_path]).
prerequisites(cellular_Traffic_Intercept, [none]).
prerequisites(sniff_Application_Code, [attacker_must_have_ability_to_place_themself_in_the_communication_path_between_client_and_server, targeted_application_must_receive_application_code_from_server, attacker_must_be_able_to_employ_sniffer_on_the_network_without_being_detected]).
prerequisites(probe_Audio_and_Video_Peripherals, [knowledge_of_target_devices_or_application_vulnerabilities, adversary_must_be_able_to_place_malicious_code_on_the_target_device]).
prerequisites(wiFi_MAC_Address_Tracking, [none]).
prerequisites(wiFi_SSID_Tracking, [none]).
prerequisites(cellular_Broadcast_Message_Request, [attacker_must_have_knowledge_of_targets_mobile_phone_number]).
prerequisites(signal_Strength_Tracking, [none]).
prerequisites(tcp_SYN_Scan, [on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_Connect_Scan, [adversary_needs_logical_access_to_the_target_network, requires_ability_to_connect_to_available_port_and_complete_three_way_handshake]).
prerequisites(tcp_FIN_Scan, [on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_Xmas_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_Null_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_ACK_Scan, [adversary_needs_logical_access_to_the_target_network, requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_Window_Scan, [requires_the_use_of_raw_sockets, on_Unix_and_Linux_raw_socket_manipulations_require_root_privileges]).
prerequisites(tcp_RPC_Scan, [no_special_privileges_when_it_is_performed_via_native_system_utility]).
prerequisites(udp_Scan, [ability_to_send_UDP_datagrams_to_host_and_receive_ICMP_error_messages_from_that_host]).
prerequisites(padding_Oracle_Crypto_Attack, [inproperly_authenticatation_prior_to_performing_decryption_operation]).
prerequisites(cryptanalysis_of_Cellular_Encryption, [none]).
prerequisites(xml_Routing_Detour_Attacks, [targeted_system_must_have_multiple_stages_processing_of_XML_content]).
prerequisites(transaction_or_Event_Tampering_via_Application_API_Manipulation, [targeted_software_is_utilizing_application_framework_APIs]).
prerequisites(content_Spoofing_Via_Application_API_Manipulation, [targeted_software_is_utilizing_application_framework_APIs]).
prerequisites(navigation_Remapping_To_Propagate_Malicious_Content, [targeted_software_is_utilizing_application_framework_APIs]).
prerequisites(aplication_API_Button_Hijacking, [targeted_software_is_utilizing_application_framework_APIs]).
prerequisites(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [victim_and_the_attacker_are_in_environment_where_active_man_in_the_middle_attack_is_possible, victim_visits_website_that_does_not_use_TLS_SSL]).
prerequisites(establish_Rogue_Location, [expected_resource_to_be_available_to_user]).
prerequisites(sniffing_Attacks, [target_data_stream_must_be_transmitted_on_a_medium_to_which_the_adversary_has_access]).
prerequisites(cryptanalysis, [target_software_utilizes_some_sort_of_cryptographic_algorithm, attacker_has_access_to_the_ciphertext]).
prerequisites(reflection_Attack_in_Authentication_Protocol, [attacker_must_have_direct_access_to_the_target_server]).
prerequisites(data_Serialization_External_Entities_Blowup, [server_that_has_an_implementation_that_accepts_entities_containing_URI_values]).
prerequisites(eavesdropping, [physical_proximity_to_the_targets_environment]).
prerequisites(manipulating_Opaque_Client_based_Data_Tokens, [attacker_has_some_access_to_the_system, some_data_must_be_held_client_side]).


