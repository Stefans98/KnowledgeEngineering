package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.model.Mitigations;
import knowledge.engineering.information.security.system.prolog.PrologMitigations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/prolog")
public class PrologController {

    @Autowired
    private PrologMitigations prologMitigations;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Mitigations>> getMitigations() {
        List<Mitigations> result = prologMitigations.getMitigations("manipulating_Opaque_Client_based_Data_Tokens");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
