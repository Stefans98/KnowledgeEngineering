package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.model.VulnerabilityFactors;
import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.JFuzzyLogic;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/fuzzy")
public class FuzzyController {

    private static final String fclFilename = "./src/main/resources/data/vulnerabilityRisk.fcl";

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Double> calculateVulnerabilityRisk(@RequestBody VulnerabilityFactors vulnerabilityFactors) {
        String args[] =  { "-noCharts", "-e", fclFilename,
                "" + vulnerabilityFactors.getAttackComplexity(),
                "" + vulnerabilityFactors.getAttackVector(),
                "" + vulnerabilityFactors.getAvailability(),
                "" + vulnerabilityFactors.getConfidentiality(),
                "" + vulnerabilityFactors.getIntegrity(),
                "" + vulnerabilityFactors.getPrivilegesRequired(),
                "" + vulnerabilityFactors.getScope(),
                "" + vulnerabilityFactors.getUserInteraction()};

        JFuzzyLogic jFuzzyLogic = new JFuzzyLogic(args);
        jFuzzyLogic.run();
        FIS fis = jFuzzyLogic.getFis();

        return new ResponseEntity<>(fis.getVariable("risk_of_vulnerability").getValue(), HttpStatus.OK);
    }

}
