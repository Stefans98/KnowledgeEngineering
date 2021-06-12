package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.cbr.CbrApplication;
import knowledge.engineering.information.security.system.dto.CbrDto;
import knowledge.engineering.information.security.system.dto.CbrParamsDto;
import knowledge.engineering.information.security.system.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucm.gaia.jcolibri.cbrcore.CBRCase;
import ucm.gaia.jcolibri.util.FileIO;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/cbr")
public class CbrController {

    @Autowired
    private CbrApplication cbrApplication;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CbrDto>> calculateVulnerabilityRisk(@RequestBody CbrParameters cbrParameters) {
        Level likelihood = Level.LOW;
        if(cbrParameters.getLikelihood() == 0){
            likelihood = Level.LOW;
        }else if(cbrParameters.getLikelihood() == 1){
            likelihood = Level.MEDIUM;
        }else if(cbrParameters.getLikelihood() == 2){
            likelihood = Level.HIGH;
        }

        Level severity = Level.LOW;
        if(cbrParameters.getSeverity() == 0){
            severity = Level.LOW;
        }else if(cbrParameters.getSeverity() == 1){
            severity = Level.MEDIUM;
        }else if(cbrParameters.getSeverity() == 2){
            severity = Level.HIGH;
        }
        List<CbrDto> result = cbrApplication.cbrResult(likelihood, severity, cbrParameters.getPrerequisites(),
                cbrParameters.getConsequences(), cbrParameters.getWeaknesses(), cbrParameters.getMitigations());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CbrDto>> getSimilarity() {
        List<CbrDto> result = cbrApplication.cbrResult(Level.HIGH, Level.MEDIUM, "cookie_is_contained_in_reply_to_adversary",
                "gain_privileges", "missing_Encryption_of_Sensitive_Data", "unspecified");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value="getCbrParams", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CbrParamsDto> getAllCbrParameters() {
        CbrParamsDto cbrParamsDto = new CbrParamsDto();

        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(FileIO.openFile("./src/main/resources/data/attacks.csv")));
            if (br == null)
                throw new Exception("Error opening file");

            String line = "";
            while ((line = br.readLine()) != null) {
                if (line.startsWith("#") || (line.length() == 0))
                    continue;
                String[] values = line.split(";");

                // Prerequisites
                String[] prerequisitesStrings = values[4].split(",");
                List<String> prerequisitesList = new ArrayList<>();
                for(int i = 0; i < prerequisitesStrings.length; i++){
                    prerequisitesList.add(prerequisitesStrings[i]);
                }
                cbrParamsDto.setPrerequisites(prerequisitesList);
                Prerequisites prerequisites = new Prerequisites();
                prerequisites.setName(values[4]);

                Consequences consequences = new Consequences();
                if(!values[5].equals("unspecified")) {
                    consequences.setName(values[5]);
                } else {
                    consequences.setName("");
                }

                Weaknesses weaknesses = new Weaknesses();
                if(!values[6].equals("unspecified")) {
                    weaknesses.setName(values[6]);
                } else {
                    weaknesses.setName("");
                }

                Mitigations mitigations = new Mitigations();
                if(!values[7].equals("unspecified")) {
                    mitigations.setName(values[7]);
                } else {
                    mitigations.setName("");
                }
            }
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(cbrParamsDto, HttpStatus.OK);
    }

}
