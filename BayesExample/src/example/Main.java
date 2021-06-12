package example;

import java.io.File;
import java.util.*;

import unbbayes.io.BaseIO;
import unbbayes.io.NetIO;
import unbbayes.prs.Edge;
import unbbayes.prs.Node;
import unbbayes.prs.bn.JunctionTreeAlgorithm;
import unbbayes.prs.bn.PotentialTable;
import unbbayes.prs.bn.ProbabilisticNetwork;
import unbbayes.prs.bn.ProbabilisticNode;
import unbbayes.util.extension.bn.inference.IInferenceAlgorithm;

public class Main {

	public static void main(String[] args) throws Exception {

		// ProbabilisticNetwork net = new ProbabilisticNetwork("example");
		// loading from file
		BaseIO io = new NetIO();
		ProbabilisticNetwork net = (ProbabilisticNetwork)io.load(new File("data/bayes.net"));

		// Continent
		/*ProbabilisticNode varContinent = new ProbabilisticNode();
		varContinent.setName("Continent");
		varContinent.appendState("Europe");
		varContinent.appendState("Asia");
		varContinent.appendState("North America");
		varContinent.appendState("South America");
		varContinent.appendState("Australia");
		PotentialTable probContinent = varContinent.getProbabilityFunction();
		probContinent.addVariable(varContinent);
		probContinent.setValue(0, 0.25f);
		probContinent.setValue(1, 0.20f);
		probContinent.setValue(2, 0.35f);
		probContinent.setValue(3, 0.10f);
		probContinent.setValue(4, 0.10f);
		net.addNode(varContinent);

		// Industry
		ProbabilisticNode varIndustry = new ProbabilisticNode();
		varIndustry.setName("Industry");
		varIndustry.appendState("Services");
		varIndustry.appendState("Manufacturing");
		varIndustry.appendState("Finance, Insurance & Real Estate");
		varIndustry.appendState("Public Administration");
		varIndustry.appendState("Unclassifiable Establishments");
		PotentialTable probIndustry = varIndustry.getProbabilityFunction();
		probIndustry.addVariable(varIndustry);
		probIndustry.setValue(0, 0.35f);
		probIndustry.setValue(1, 0.25f);
		probIndustry.setValue(2, 0.20f);
		probIndustry.setValue(3, 0.15f);
		probIndustry.setValue(4, 0.05f);
		net.addNode(varIndustry);

		// Company size
		ProbabilisticNode varCompanySize = new ProbabilisticNode();
		varCompanySize.setName("Company_Size");
		varCompanySize.appendState("1-250");
		varCompanySize.appendState("251-500");
		varCompanySize.appendState("501-1000");
		varCompanySize.appendState("1000+");
		PotentialTable probCompanySize = varCompanySize.getProbabilityFunction();
		probCompanySize.addVariable(varCompanySize);
		probCompanySize.setValue(0, 0.10f);
		probCompanySize.setValue(1, 0.20f);
		probCompanySize.setValue(2, 0.30f);
		probCompanySize.setValue(3, 0.40f);
		net.addNode(varCompanySize);

		// Theft of data
		ProbabilisticNode varTheftOfData = new ProbabilisticNode();
		varTheftOfData.setName("Theft_of_data");
		varTheftOfData.appendState("Yes");
		varTheftOfData.appendState("No");
		PotentialTable probTheftOfData = varTheftOfData.getProbabilityFunction();
		probTheftOfData.addVariable(varTheftOfData);
		probTheftOfData.setValue(0, 0.50f);
		probTheftOfData.setValue(1, 0.50f);
		net.addNode(varTheftOfData);

		// Identity theft or fraud
		ProbabilisticNode varIdentityTheftOrFraud = new ProbabilisticNode();
		varIdentityTheftOrFraud.setName("Identity_theft_or_fraud");
		varIdentityTheftOrFraud.appendState("Yes");
		varIdentityTheftOrFraud.appendState("No");
		PotentialTable probIdentityTheftOrFraud = varIdentityTheftOrFraud.getProbabilityFunction();
		probIdentityTheftOrFraud.addVariable(varIdentityTheftOrFraud);
		probIdentityTheftOrFraud.setValue(0, 0.50f);
		probIdentityTheftOrFraud.setValue(1, 0.50f);
		net.addNode(varIdentityTheftOrFraud);

		// Network disruption or DDoS
		ProbabilisticNode varNetworkDisruptionOrDDoS = new ProbabilisticNode();
		varNetworkDisruptionOrDDoS.setName("Network_disruption_or_DDoS");
		varNetworkDisruptionOrDDoS.appendState("Yes");
		varNetworkDisruptionOrDDoS.appendState("No");
		PotentialTable probNetworkDisruptionOrDDoS = varNetworkDisruptionOrDDoS.getProbabilityFunction();
		probNetworkDisruptionOrDDoS.addVariable(varNetworkDisruptionOrDDoS);
		probNetworkDisruptionOrDDoS.setValue(0, 0.50f);
		probNetworkDisruptionOrDDoS.setValue(1, 0.50f);
		net.addNode(varNetworkDisruptionOrDDoS);

		// Incorrectly configured firewalls
		ProbabilisticNode varIncorrectlyConfiguredFirewalls = new ProbabilisticNode();
		varIncorrectlyConfiguredFirewalls.setName("Incorrectly_configured_firewalls");
		varIncorrectlyConfiguredFirewalls.appendState("Yes");
		varIncorrectlyConfiguredFirewalls.appendState("No");
		PotentialTable probIncorrectlyConfiguredFirewalls = varIncorrectlyConfiguredFirewalls.getProbabilityFunction();
		probIncorrectlyConfiguredFirewalls.addVariable(varIncorrectlyConfiguredFirewalls);
		probIncorrectlyConfiguredFirewalls.setValue(0, 0.50f);
		probIncorrectlyConfiguredFirewalls.setValue(1, 0.50f);
		net.addNode(varIncorrectlyConfiguredFirewalls);

		// Signal level alerts
		ProbabilisticNode varSignalLevelAlerts = new ProbabilisticNode();
		varSignalLevelAlerts.setName("Signal_level_alerts");
		varSignalLevelAlerts.appendState("Yes");
		varSignalLevelAlerts.appendState("No");
		PotentialTable probSignalLevelAlerts = varSignalLevelAlerts.getProbabilityFunction();
		probSignalLevelAlerts.addVariable(varSignalLevelAlerts);
		probSignalLevelAlerts.setValue(0, 0.50f);
		probSignalLevelAlerts.setValue(1, 0.50f);
		net.addNode(varSignalLevelAlerts);

		// Sensitive information
		ProbabilisticNode varSensitiveInformation = new ProbabilisticNode();
		varSensitiveInformation.setName("Sensitive_information");
		varSensitiveInformation.appendState("Protected");
		varSensitiveInformation.appendState("Not protected");
		PotentialTable probSensitiveInformation = varSensitiveInformation.getProbabilityFunction();
		probSensitiveInformation.addVariable(varSensitiveInformation);
		probSensitiveInformation.setValue(0, 0.50f);
		probSensitiveInformation.setValue(1, 0.50f);
		net.addNode(varSensitiveInformation);

		// Covert timing channel
		ProbabilisticNode varCovertTimingChannel = new ProbabilisticNode();
		varCovertTimingChannel.setName("Covert_timing_channel");
		varCovertTimingChannel.appendState("Yes");
		varCovertTimingChannel.appendState("No");
		PotentialTable probCovertTimingChannel = varCovertTimingChannel.getProbabilityFunction();
		probCovertTimingChannel.addVariable(varCovertTimingChannel);
		probCovertTimingChannel.setValue(0, 0.50f);
		probCovertTimingChannel.setValue(1, 0.50f);
		net.addNode(varCovertTimingChannel);

		// Security checks
		ProbabilisticNode varSecurityChecks = new ProbabilisticNode();
		varSecurityChecks.setName("Security_checks");
		varSecurityChecks.appendState("Yes");
		varSecurityChecks.appendState("No");
		PotentialTable probSecurityChecks = varSecurityChecks.getProbabilityFunction();
		probSecurityChecks.addVariable(varSecurityChecks);
		probSecurityChecks.setValue(0, 0.50f);
		probSecurityChecks.setValue(1, 0.50f);
		net.addNode(varSecurityChecks);

		// Loss or theft of device
		ProbabilisticNode varLossOrTheftOfDevice = new ProbabilisticNode();
		varLossOrTheftOfDevice.setName("Loss_or_theft_of_device");
		varLossOrTheftOfDevice.appendState("Yes");
		varLossOrTheftOfDevice.appendState("No");
		PotentialTable probLossOrTheftOfDevice = varLossOrTheftOfDevice.getProbabilityFunction();
		probLossOrTheftOfDevice.addVariable(varLossOrTheftOfDevice);
		probLossOrTheftOfDevice.setValue(0, 0.50f);
		probLossOrTheftOfDevice.setValue(1, 0.50f);
		net.addNode(varLossOrTheftOfDevice);

		// Interacting with system
		ProbabilisticNode varInteractingWithSystem = new ProbabilisticNode();
		varInteractingWithSystem.setName("Interacting_with_system");
		varInteractingWithSystem.appendState("Yes");
		varInteractingWithSystem.appendState("No");
		PotentialTable probInteractingWithSystem = varInteractingWithSystem.getProbabilityFunction();
		probInteractingWithSystem.addVariable(varInteractingWithSystem);
		probInteractingWithSystem.setValue(0, 0.50f);
		probInteractingWithSystem.setValue(1, 0.50f);
		net.addNode(varInteractingWithSystem);

		// Communication paths
		ProbabilisticNode varCommunicationPaths = new ProbabilisticNode();
		varCommunicationPaths.setName("Communication_paths");
		varCommunicationPaths.appendState("Trusted");
		varCommunicationPaths.appendState("Untrusted");
		PotentialTable probCommunicationPaths = varCommunicationPaths.getProbabilityFunction();
		probCommunicationPaths.addVariable(varCommunicationPaths);
		probCommunicationPaths.setValue(0, 0.50f);
		probCommunicationPaths.setValue(1, 0.50f);
		net.addNode(varCommunicationPaths);

		// Configuration
		ProbabilisticNode varConfiguration = new ProbabilisticNode();
		varConfiguration.setName("Configuration");
		varConfiguration.appendState("Good");
		varConfiguration.appendState("Bad");
		PotentialTable probConfiguration = varConfiguration.getProbabilityFunction();
		probConfiguration.addVariable(varConfiguration);
		probConfiguration.setValue(0, 0.50f);
		probConfiguration.setValue(1, 0.50f);
		net.addNode(varConfiguration);


		ProbabilisticNode varTaxi = new ProbabilisticNode();
		varTaxi.setName("taxi");
		varTaxi.appendState("blue");
		varTaxi.appendState("green");
		PotentialTable probTaxi = varTaxi.getProbabilityFunction();
		probTaxi.addVariable(varTaxi);
		probTaxi.setValue(0, 0.85f);
		probTaxi.setValue(1, 0.15f);
		net.addNode(varTaxi);

		ProbabilisticNode varWitness = new ProbabilisticNode();
		varWitness.setName("witness");
		varWitness.appendState("blue");
		varWitness.appendState("green");
		net.addNode(varWitness);
		PotentialTable probWitness = varWitness.getProbabilityFunction();
		probWitness.addVariable(varWitness);
		
		net.addEdge( new Edge(varTaxi, varWitness) );
		
		probWitness.setValue(0, 0.8f);  // taxi is blue & witness observed as blue
		probWitness.setValue(1, 0.2f);  // taxi is green & witness observed as blue
		probWitness.setValue(2, 0.2f);  // taxi is blue & witness observed as green
		probWitness.setValue(3, 0.8f);  // taxi is green & witness observed as green


		// ATTACK
		// CarryOff_GPS_Attack
		ProbabilisticNode varCarryOffGPSAttack = new ProbabilisticNode();
		varCarryOffGPSAttack.setName("CarryOff_GPS_Attack");
		varCarryOffGPSAttack.appendState("It happened");
		varCarryOffGPSAttack.appendState("It didn't happen");
		net.addNode(varCarryOffGPSAttack);
		PotentialTable probCarryOffGPSAttack = varCarryOffGPSAttack.getProbabilityFunction();
		probCarryOffGPSAttack.addVariable(varCarryOffGPSAttack);

		// CarryOff_GPS_Attack -> Continent
		net.addEdge( new Edge(varContinent, varCarryOffGPSAttack) );
		probCarryOffGPSAttack.setValue(0, 0.7f);
		probCarryOffGPSAttack.setValue(1, 0.5f);
		probCarryOffGPSAttack.setValue(2, 0.25f);
		probCarryOffGPSAttack.setValue(3, 0.4f);
		probCarryOffGPSAttack.setValue(4, 0.8f);
		probCarryOffGPSAttack.setValue(5, 0.3f);
		probCarryOffGPSAttack.setValue(6, 0.5f);
		probCarryOffGPSAttack.setValue(7, 0.75f);
		probCarryOffGPSAttack.setValue(8, 0.6f);
		probCarryOffGPSAttack.setValue(9, 0.2f);

		// CarryOff_GPS_Attack -> Industry
		net.addEdge( new Edge(varIndustry, varCarryOffGPSAttack) );
		probCarryOffGPSAttack.setValue(0, 0.15f);
		probCarryOffGPSAttack.setValue(1, 0.55f);
		probCarryOffGPSAttack.setValue(2, 0.20f);
		probCarryOffGPSAttack.setValue(3, 0.90f);
		probCarryOffGPSAttack.setValue(4, 0.75f);
		probCarryOffGPSAttack.setValue(5, 0.85f);
		probCarryOffGPSAttack.setValue(6, 0.45f);
		probCarryOffGPSAttack.setValue(7, 0.80f);
		probCarryOffGPSAttack.setValue(8, 0.10f);
		probCarryOffGPSAttack.setValue(9, 0.25f);

		// CarryOff_GPS_Attack -> Company_size
		net.addEdge( new Edge(varCompanySize, varCarryOffGPSAttack) );
		probCarryOffGPSAttack.setValue(0, 0.25f);
		probCarryOffGPSAttack.setValue(1, 0.15f);
		probCarryOffGPSAttack.setValue(2, 0.40f);
		probCarryOffGPSAttack.setValue(3, 0.10f);
		probCarryOffGPSAttack.setValue(4, 0.75f);
		probCarryOffGPSAttack.setValue(5, 0.85f);
		probCarryOffGPSAttack.setValue(6, 0.60f);
		probCarryOffGPSAttack.setValue(7, 0.90f);

		// CarryOff_GPS_Attack -> Loss_or_theft_of_device
		net.addEdge( new Edge(varLossOrTheftOfDevice, varCarryOffGPSAttack) );
		probCarryOffGPSAttack.setValue(0, 0.45f);
		probCarryOffGPSAttack.setValue(1, 0.88f);
		probCarryOffGPSAttack.setValue(2, 0.55f);
		probCarryOffGPSAttack.setValue(3, 0.12f);

		// CarryOff_GPS_Attack -> Security_checks
		net.addEdge( new Edge(varSecurityChecks, varCarryOffGPSAttack) );
		probCarryOffGPSAttack.setValue(0, 0.20f);
		probCarryOffGPSAttack.setValue(1, 0.70f);
		probCarryOffGPSAttack.setValue(2, 0.80f);
		probCarryOffGPSAttack.setValue(3, 0.30f);
		*/

		// compiling

		IInferenceAlgorithm algorithm = new JunctionTreeAlgorithm();
		algorithm.setNetwork(net);
		algorithm.run();
		
		// states overview
		List<Node> nodeList = net.getNodes();
		/*for (Node node: nodeList) {
			System.out.println(node.getName());
			for (int i = 0; i < node.getStatesSize(); i++) {
				System.out.println(node.getStateAt(i) + ": " + ((ProbabilisticNode)node).getMarginalAt(i));
			}
		}
		*/
		/*
		// adding an evidence
		ProbabilisticNode factNode = (ProbabilisticNode)net.getNode("witness");
		int stateIndex = 1; // index of state "green"
		factNode.addFinding(stateIndex);
		
		System.out.println();
		
		// propagation
		try {
        	net.updateEvidences();
        } catch (Exception e) {
        	System.out.println(e.getMessage());               	
        }
        
        // states overview after propagation
		for (Node node : nodeList) {
			System.out.println(node.getName());
			for (int i = 0; i < node.getStatesSize(); i++) {
				System.out.println(node.getStateAt(i) + ": " + ((ProbabilisticNode)node).getMarginalAt(i));
			}
		}
		// saving to file
		// new NetIO().save(new File("example.net"), net);
		*/


		// adding an evidence
		ProbabilisticNode factNode = (ProbabilisticNode)net.getNode("Continent");
		int stateIndex = 0;
		factNode.addFinding(stateIndex);

		ProbabilisticNode factNode1 = (ProbabilisticNode)net.getNode("Industry");
		int stateIndex1 = 0;
		factNode.addFinding(stateIndex);

		ProbabilisticNode factNode2 = (ProbabilisticNode)net.getNode("Company_size");
		int stateIndex2 = 0;
		factNode.addFinding(stateIndex);

		ProbabilisticNode factNode3 = (ProbabilisticNode)net.getNode("Loss_or_theft_of_device");
		int stateIndex3 = 0;
		factNode.addFinding(stateIndex);

		ProbabilisticNode factNode4 = (ProbabilisticNode)net.getNode("Security_checks");
		int stateIndex4 = 0;
		factNode.addFinding(stateIndex);

		System.out.println();

		// propagation
		try {
			net.updateEvidences();
		} catch (Exception e) {
			//System.out.println(e.getMessage());
		}

		// states overview after propagation
		ArrayList<BayesDto> result = new ArrayList<>();
		for (Node node : nodeList) {
			//System.out.println(node.getName());
			for (int i = 0; i < node.getStatesSize(); i++) {
				if (node.getStateAt(i).equals("It happened")) {
					BayesDto dto = new BayesDto();
					dto.setAttackName(node.getName());
					dto.setItHappenPercentage(((ProbabilisticNode) node).getMarginalAt(i));
					result.add(dto);
					System.out.println(dto.getAttackName() + ":" + dto.getItHappenPercentage());
					//System.out.println(node.getStateAt(i) + ": " + ((ProbabilisticNode) node).getMarginalAt(i));
				}
			}

		}

		result.sort(Comparator.comparing(BayesDto::getItHappenPercentage).reversed());

		System.out.println("SORTED:");
		for(BayesDto dto : result){
			System.out.println(dto.getAttackName() + ":" + dto.getItHappenPercentage());
		}

		List<BayesDto> finalResult = new ArrayList<>();
		for(int i=0; i < result.size(); i++){
			if(i < 5) {
				finalResult.add(result.get(i));
			}
		}

		System.out.println("TOP 5:");
		for(BayesDto dto : finalResult){
			System.out.println(dto.getAttackName() + ":" + dto.getItHappenPercentage());
		}


		// saving to file
		// new NetIO().save(new File("example.net"), net);
	}
}

