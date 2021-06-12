package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.dto.BayesDto;
import knowledge.engineering.information.security.system.model.BayesParameters;
import knowledge.engineering.information.security.system.model.VulnerabilityFactors;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unbbayes.io.BaseIO;
import unbbayes.io.NetIO;
import unbbayes.prs.Node;
import unbbayes.prs.bn.JunctionTreeAlgorithm;
import unbbayes.prs.bn.ProbabilisticNetwork;
import unbbayes.prs.bn.ProbabilisticNode;
import unbbayes.util.extension.bn.inference.IInferenceAlgorithm;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "api/bayes")
public class BayesController {

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BayesDto>> propagateAttacks(@RequestBody BayesParameters bayesParameters) throws IOException {
        BaseIO io = new NetIO();
        ProbabilisticNetwork net = (ProbabilisticNetwork)io.load(new File("./src/main/resources/data/bayes.net"));

        IInferenceAlgorithm algorithm = new JunctionTreeAlgorithm();
        algorithm.setNetwork(net);
        algorithm.run();

        List<Node> nodeList = net.getNodes();

        if(bayesParameters.getContinent() != null ) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Continent");
            int stateIndex = bayesParameters.getContinent();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getIndustry() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Industry");
            int stateIndex = bayesParameters.getIndustry();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getCompanySize() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Company_size");
            int stateIndex = bayesParameters.getCompanySize();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getTheftOfData() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Theft_of_data");
            int stateIndex = bayesParameters.getTheftOfData();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getSignalLevelAlerts() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Signal_level_alerts");
            int stateIndex = bayesParameters.getSignalLevelAlerts();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getNetworkDisruptionOrDDoS() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Network_disruption_or_DDoS");
            int stateIndex = bayesParameters.getNetworkDisruptionOrDDoS();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getIncorrectlyConfiguredFirewalls() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Incorrectly_configured_firewalls");
            int stateIndex = bayesParameters.getIncorrectlyConfiguredFirewalls();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getConfiguration() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Configuration");
            int stateIndex = bayesParameters.getConfiguration();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getLossOrTheftOfDevice() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Loss_or_theft_of_device");
            int stateIndex = bayesParameters.getLossOrTheftOfDevice();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getSensitiveInformation() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Sensitive_information");
            int stateIndex = bayesParameters.getSensitiveInformation();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getCovertTimingChannel() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Covert_timing_channel");
            int stateIndex = bayesParameters.getCovertTimingChannel();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getSecurityChecks() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Security_checks");
            int stateIndex = bayesParameters.getSecurityChecks();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getIdentityTheftOrFraud() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Identity_theft_or_fraud");
            int stateIndex = bayesParameters.getIdentityTheftOrFraud();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getInteractingWithSystem() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Interacting_with_system");
            int stateIndex = bayesParameters.getInteractingWithSystem();
            factNode.addFinding(stateIndex);
        }

        if(bayesParameters.getCommunicationPaths() != null) {
            ProbabilisticNode factNode = (ProbabilisticNode) net.getNode("Communication_paths");
            int stateIndex = bayesParameters.getCommunicationPaths();
            factNode.addFinding(stateIndex);
        }

        // propagation
        try {
            net.updateEvidences();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        // states overview after propagation
        ArrayList<BayesDto> result = new ArrayList<>();
        for (Node node : nodeList) {
            for (int i = 0; i < node.getStatesSize(); i++) {
                if (node.getStateAt(i).equals("It happened")) {
                    BayesDto dto = new BayesDto();
                    dto.setAttackName(node.getName());
                    dto.setItHappenPercentage(((ProbabilisticNode) node).getMarginalAt(i));
                    result.add(dto);
                }
            }
        }

        result.sort(Comparator.comparing(BayesDto::getItHappenPercentage).reversed());

        List<BayesDto> finalResult = new ArrayList<>();
        for(int i=0; i < result.size(); i++){
            if(i < 5) {
                finalResult.add(result.get(i));
            }
        }

        return new ResponseEntity<>(finalResult, HttpStatus.OK);
    }
}
