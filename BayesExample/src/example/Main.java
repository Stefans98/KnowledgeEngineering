package example;

import java.io.File;
import java.util.List;

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

		ProbabilisticNetwork net = new ProbabilisticNetwork("example");
		// loading from file
		// BaseIO io = new NetIO();
		// net = (ProbabilisticNetwork)io.load(new File("example.net"));

		// Continent
		ProbabilisticNode varContinent = new ProbabilisticNode();
		varContinent.setName("Continent");
		varContinent.appendState("Europe");
		varContinent.appendState("Asia");
		varContinent.appendState("North America");
		varContinent.appendState("South America");
		varContinent.appendState("Australia");
		varContinent.appendState("Africa");
		PotentialTable probContinent = varContinent.getProbabilityFunction();
		probContinent.addVariable(varContinent);
		probContinent.setValue(0, 0.25f);
		probContinent.setValue(1, 0.20f);
		probContinent.setValue(2, 0.35f);
		probContinent.setValue(3, 0.05f);
		probContinent.setValue(4, 0.10f);
		probContinent.setValue(5, 0.05f);
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

		// Causes of data breaches
		ProbabilisticNode varCausesOfDataBreaches = new ProbabilisticNode();
		varCausesOfDataBreaches.setName("Causes_of_data_breaches");
		varCausesOfDataBreaches.appendState("Theft of Data");
		varCausesOfDataBreaches.appendState("Network Disruption or DDoS");
		varCausesOfDataBreaches.appendState("Loss or Theft of Device");
		varCausesOfDataBreaches.appendState("Identity Theft or Fraud");
		PotentialTable probCausesOfDataBreaches = varCausesOfDataBreaches.getProbabilityFunction();
		probCausesOfDataBreaches.addVariable(varCausesOfDataBreaches);
		probCausesOfDataBreaches.setValue(0, 0.40f);
		probCausesOfDataBreaches.setValue(1, 0.25f);
		probCausesOfDataBreaches.setValue(2, 0.20f);
		probCausesOfDataBreaches.setValue(3, 0.15f);
		net.addNode(varCausesOfDataBreaches);

		// Operating system
		ProbabilisticNode varOperatingSystem = new ProbabilisticNode();
		varOperatingSystem.setName("Operating_system");
		varOperatingSystem.appendState("Windows");
		varOperatingSystem.appendState("MacOS");
		varOperatingSystem.appendState("Linux");
		PotentialTable probOperatingSystem = varOperatingSystem.getProbabilityFunction();
		probOperatingSystem.addVariable(varOperatingSystem);
		probOperatingSystem.setValue(0, 0.50f);
		probOperatingSystem.setValue(1, 0.35f);
		probOperatingSystem.setValue(2, 0.15f);
		net.addNode(varOperatingSystem);

		// Taxi
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

		// compiling
		IInferenceAlgorithm algorithm = new JunctionTreeAlgorithm();
		algorithm.setNetwork(net);
		algorithm.run();
		
		// states overview
		List<Node> nodeList = net.getNodes();
		for (Node node: nodeList) {
			System.out.println(node.getName());
			for (int i = 0; i < node.getStatesSize(); i++) {
				System.out.println(node.getStateAt(i) + ": " + ((ProbabilisticNode)node).getMarginalAt(i));
			}
		}
		
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
	}	

}
