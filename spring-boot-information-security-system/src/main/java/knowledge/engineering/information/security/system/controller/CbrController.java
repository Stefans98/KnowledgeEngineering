package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.cbr.CbrApplication;
import knowledge.engineering.information.security.system.dto.CbrDto;
import knowledge.engineering.information.security.system.model.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/cbr")
public class CbrController {

    @Autowired
    private CbrApplication cbrApplication;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CbrDto>> getGreetings() {
        List<CbrDto> result = cbrApplication.cbrResult(Level.HIGH, Level.MEDIUM, "cookie_is_contained_in_reply_to_adversary",
                "gain_privileges", "missing_Encryption_of_Sensitive_Data", "unspecified");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
