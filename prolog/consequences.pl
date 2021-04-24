consequences(carryOff_GPS_Attack).
consequences(terrestrial_Jamming, deny_availability_of_satellite_communications).
consequences(evil_Twin_WiFi_Attack, read_data).
consequences(cellular_Rogue_Base_Station, read_data).
consequences(sniffing_Network_Traffic, read_data).
consequences(accessing_Intercepting_Modifying_HTTP_Cookies, [read_data, modify_data, gain_privileges]).
consequences(utilizing_RESTs_Trust_in_the_System_Resource_to_Obtain_Sensitive_Data, gain_privileges).
consequences(cellular_Traffic_Intercept, read_data).
consequences(sniff_Application_Code, [read_data, gain_privileges]).
consequences(probe_Audio_and_Video_Peripherals, read_data).
consequences(wiFi_MAC_Address_Tracking).
consequences(wiFi_SSID_Tracking).
consequences(cellular_Broadcast_Message_Request).
consequences(signal_Strength_Tracking).
consequences(tcp_SYN_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(tcp_Connect_Scan, read_data).
consequences(tcp_FIN_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(tcp_Xmas_Scan, [bypass_protection_mechanism, hide_activities, unreliable_execution]).
consequences(tcp_Null_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(tcp_ACK_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(tcp_Window_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(tcp_RPC_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(udp_Scan, [bypass_protection_mechanism, hide_activities]).
consequences(padding_Oracle_Crypto_Attack).
consequences(cryptanalysis_of_Cellular_Encryption).
consequences(xml_Routing_Detour_Attacks, [modify_data, read_data, gain_privileges, bypass_protection_mechanism]).
consequences(transaction_or_Event_Tampering_via_Application_API_Manipulation).
consequences(content_Spoofing_Via_Application_API_Manipulation).
consequences(navigation_Remapping_To_Propagate_Malicious_Content).
consequences(aplication_API_Button_Hijacking).
consequences(leveraging_Active_Man_in_the_Middle_Attacks_to_Bypass_Same_Origin_Policy, [read_data, execute_unauthorized_commands]).
