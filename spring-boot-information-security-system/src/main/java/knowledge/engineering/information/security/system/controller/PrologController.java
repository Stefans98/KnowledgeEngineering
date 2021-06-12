package knowledge.engineering.information.security.system.controller;

import com.ugos.jiprolog.engine.JIPEngine;
import com.ugos.jiprolog.engine.JIPQuery;
import com.ugos.jiprolog.engine.JIPTerm;
import com.ugos.jiprolog.engine.JIPVariable;
import knowledge.engineering.information.security.system.model.Mitigations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/prolog")
public class PrologController {

    @GetMapping(value="mitigations/{attackName}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Mitigations>> getMitigations(@PathVariable String attackName) {

        JIPEngine engine = new JIPEngine();

        engine.consultFile("./src/main/resources/data/prolog.pl");
        // String attack_name = "manipulating_Opaque_Client_based_Data_Tokens";
        JIPQuery query = engine.openSynchronousQuery("suggestions_by_name(" + attackName + ", Suggestions)");

        // pravila se mogu dodavati i tokom izvrsavanja (u runtime-u)
        // assertz dodaje pravilo na kraj programa (aasserta dodaje na pocetak programa), na primer:
        // engine.assertz(engine.getTermParser().parseTerm("sledbenik(X,Y) :- X is Y+1."));

        List<Mitigations> result = new ArrayList<>();

        JIPTerm solution;
        while ( (solution = query.nextSolution()) != null) {
            // System.out.println("Solution: " + solution);
            for (JIPVariable var: solution.getVariables()) {
                String value = var.getValue().toString().replace("_", " ");
                String[] values = value.split(",");

                List<String> mitigations = new ArrayList<String>();
                for(int i = 0; i < values.length - 1; i++) {
                    mitigations.add(values[i].substring(4));
                }

                for(String mitigationName : mitigations) {
                    // System.out.println(mitigationName);
                    Mitigations mitigation = new Mitigations();
                    mitigation.setName(mitigationName);
                    result.add(mitigation);
                }

                // System.out.println(var.getName() + " = " + var.getValue().toString().replace("_", " "));
            }
        }

        if(result.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
