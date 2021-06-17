package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.model.*;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.update.UpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;

@RestController
@RequestMapping(value = "api/attack")
public class AttackController {

    private static final String QUERY_URL = "http://localhost:3030/attacks_dataset/sparql";
    private static final String UPDATE_URL = "http://localhost:3030/attacks_dataset/update";

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Attack>> getAttacks() {
        List<Attack> result = new ArrayList<>();

//        // LocalExample
//        Model model = ModelFactory.createDefaultModel();
//        try {
//            InputStream is = new FileInputStream("./src/main/resources/data/attacks.ttl");
//            RDFDataMgr.read(model, is, Lang.TURTLE);
//            is.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?id ?attackName ?likelihood ?severity ?prerequisitesName ?consequencesName ?weaknessesName ?mitigationsName "
                + "WHERE {"
                + "    ?attack a pre:Attack ;"
                + "        pre:id ?id ;"
                + "        pre:name ?attackName ;"
                + "        pre:likelihood ?likelihood ;"
                + "        pre:severity ?severity ;"
                + "        pre:prerequisites ?prerequisites ;"
                + "        pre:consequences ?consequences ;"
                + "        pre:weaknesses ?weaknesses ;"
                + "        pre:mitigations ?mitigations ."
                + "    ?prerequisites a pre:Prerequisites ;"
                + "        pre:name ?prerequisitesName ."
                + "    ?consequences a pre:Consequences ;"
                + "        pre:name ?consequencesName ."
                + "    ?weaknesses a pre:Weaknesses ;"
                + "        pre:name ?weaknessesName ."
                + "    ?mitigations a pre:Mitigations ;"
                + "        pre:name ?mitigationsName ."
                + "}";

        Query query = QueryFactory.create(queryString);
        // QueryExecution qexec = QueryExecutionFactory.create(query, model); // LocalExample
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;

                Attack attack = new Attack();

                Literal idLiteral = solution.getLiteral("id");
                attack.setId(Integer.parseInt(idLiteral.getString()));

                Literal attackNameLiteral = solution.getLiteral("attackName");
                attack.setName(attackNameLiteral.getString());

                Literal likelihoodLiteral = solution.getLiteral("likelihood");
                if(likelihoodLiteral.getString().equals("0")) {
                    attack.setLikelihood(Level.Low);
                } else if(likelihoodLiteral.getString().equals("1")) {
                    attack.setLikelihood(Level.Medium);
                } else if(likelihoodLiteral.getString().equals("2")) {
                    attack.setLikelihood(Level.High);
                }

                Literal severityLiteral = solution.getLiteral("severity");
                if(severityLiteral.getString().equals("0")) {
                    attack.setSeverity(Level.Low);
                } else if(severityLiteral.getString().equals("1")) {
                    attack.setSeverity(Level.Medium);
                } else if(severityLiteral.getString().equals("2")) {
                    attack.setSeverity(Level.High);
                }

                Literal prerequisitesLiteral = solution.getLiteral("prerequisitesName");
                Prerequisites prerequisites = new Prerequisites();
                prerequisites.setName(prerequisitesLiteral.getString());
                attack.setPrerequisites(prerequisites);

                Literal consequencesLiteral = solution.getLiteral("consequencesName");
                Consequences consequences = new Consequences();
                consequences.setName(consequencesLiteral.getString());
                attack.setConsequences(consequences);

                Literal weaknessesLiteral = solution.getLiteral("weaknessesName");
                Weaknesses weaknesses = new Weaknesses();
                weaknesses.setName(weaknessesLiteral.getString());
                attack.setWeaknesses(weaknesses);

                Literal mitigationsLiteral = solution.getLiteral("mitigationsName");
                Mitigations mitigations = new Mitigations();
                mitigations.setName(mitigationsLiteral.getString());
                attack.setMitigations(mitigations);

                result.add(attack);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attack> saveAttack(@RequestBody Attack attack) {

        Attack savedAttack;

        savedAttack = insertAttack(attack, false);

        return new ResponseEntity<>(savedAttack, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attack> changeAttack(@RequestBody Attack attack) {

        Attack changedAttack;

        this.deleteAttack(attack);
        changedAttack = this.insertAttack(attack, true);

        return new ResponseEntity<>(changedAttack, HttpStatus.OK);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteAttack(@RequestBody Attack attack) {

        String attackName = attack.getName();

        // DELETE
        String deleteString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "DELETE "
                + "WHERE {"
                + "    pre:" + attackName + " ?x ?y ."
                + "}";
        UpdateRequest updateRequest = UpdateFactory.create(deleteString);
        System.setProperty("http.maxConnections", "10000");
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(updateRequest, UPDATE_URL);
        updateProcessor.execute();

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Attack insertAttack(Attack attack, boolean put) {

        Random random = new Random();
        int id = random.nextInt(900) + 100;;
        while(doesIdExist(id)) {
            id = random.nextInt(900) + 100;
        }

        String name = "attack_" + new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
        String nameContent = Character.toUpperCase(name.charAt(0)) + name.substring(1);
        nameContent = nameContent.replaceAll("_", " ");

        if(put) {
            name = attack.getName();
            nameContent = Character.toUpperCase(name.charAt(0)) + name.substring(1);
            nameContent = nameContent.replaceAll("_", " ");
        }

        int likelihood = 0;
        if(attack.getLikelihood() == Level.Medium) {
            likelihood = 1;
        } else if(attack.getLikelihood() == Level.High) {
            likelihood = 2;
        }

        int severity = 0;
        if(attack.getSeverity() == Level.Medium) {
            severity = 1;
        } else if(attack.getSeverity() == Level.High) {
            severity = 2;
        }

        String prerequisitesName = "none";
        String prerequisitesContent = "None";
        if(attack.getPrerequisites().getName() != "") {
            prerequisitesName = attack.getPrerequisites().getName();
            prerequisitesContent = "";
            String[] parts = attack.getPrerequisites().getName().split("__");
            for(int i = 0; i < parts.length; i++) {
                parts[i] = Character.toUpperCase(parts[i].charAt(0)) + parts[i].substring(1);
                parts[i] = parts[i].replaceAll("_", " ");
                if(i == 0) {
                    prerequisitesContent = prerequisitesContent.concat(parts[i]);
                } else {
                    prerequisitesContent = prerequisitesContent.concat(", ");
                    prerequisitesContent = prerequisitesContent.concat(parts[i]);
                }
            }
        }

        String consequencesName = "unspecified_consequences";
        String consequencesContent = "Unspecified";
        if(attack.getConsequences().getName() != "") {
            consequencesName = attack.getConsequences().getName();
            consequencesContent = "";
            String[] parts = attack.getConsequences().getName().split("__");
            for(int i = 0; i < parts.length; i++) {
                parts[i] = Character.toUpperCase(parts[i].charAt(0)) + parts[i].substring(1);
                parts[i] = parts[i].replaceAll("_", " ");
                if(i == 0) {
                    consequencesContent = consequencesContent.concat(parts[i]);
                } else {
                    consequencesContent = consequencesContent.concat(", ");
                    consequencesContent = consequencesContent.concat(parts[i]);
                }
            }
        }

        String weaknessesName = "unspecified_weaknesses";
        String weaknessesContent = "Unspecified";
        if(attack.getWeaknesses().getName() != "") {
            weaknessesName = attack.getWeaknesses().getName();
            weaknessesContent = "";
            String[] parts = attack.getWeaknesses().getName().split("__");
            for(int i = 0; i < parts.length; i++) {
                parts[i] = Character.toUpperCase(parts[i].charAt(0)) + parts[i].substring(1);
                parts[i] = parts[i].replaceAll("_", " ");
                if(i == 0) {
                    weaknessesContent = weaknessesContent.concat(parts[i]);
                } else {
                    weaknessesContent = weaknessesContent.concat(", ");
                    weaknessesContent = weaknessesContent.concat(parts[i]);
                }
            }
        }

        String mitigationsName = "unspecified_mitigations";
        String mitigationsContent = "Unspecified";
        if(attack.getMitigations().getName() != "") {
            mitigationsName = attack.getMitigations().getName();
            mitigationsContent = "";
            String[] parts = attack.getMitigations().getName().split("__");
            for(int i = 0; i < parts.length; i++) {
                parts[i] = Character.toUpperCase(parts[i].charAt(0)) + parts[i].substring(1);
                parts[i] = parts[i].replaceAll("_", " ");
                if(i == 0) {
                    mitigationsContent = mitigationsContent.concat(parts[i]);
                } else {
                    mitigationsContent = mitigationsContent.concat(", ");
                    mitigationsContent = mitigationsContent.concat(parts[i]);
                }
            }
        }

        String insertString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                + "INSERT DATA {"
                + "    pre:" + name + ""
                + "        a pre:Attack ; "
                + "        pre:id \"" + id + "\"^^xsd:int ; "
                + "        pre:name \"" + nameContent + "\"^^xsd:string ; "
                + "        pre:likelihood \"" + likelihood + "\"^^xsd:int ; "
                + "        pre:severity \"" + severity + "\"^^xsd:int ; "
                + "        pre:prerequisites pre:" + prerequisitesName + " ; "
                + "        pre:consequences pre:" + consequencesName + " ; "
                + "        pre:weaknesses pre:" + weaknessesName + " ; "
                + "        pre:mitigations pre:" + mitigationsName + ". "
                + "}";
        UpdateRequest updateRequest = UpdateFactory.create(insertString);
        System.setProperty("http.maxConnections", "10000");
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(updateRequest, UPDATE_URL);
        updateProcessor.execute();

        if(!doesPrerequisitesExist(prerequisitesName)) {
            String insertPrerequisitesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + prerequisitesName + ""
                    + "        a pre:Prerequisites ; "
                    + "        pre:name \"" + prerequisitesContent + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updatePrerequisitesRequest = UpdateFactory.create(insertPrerequisitesString);
            System.setProperty("http.maxConnections", "10000");
            UpdateProcessor updatePrerequisitesProcessor = UpdateExecutionFactory.createRemote(updatePrerequisitesRequest, UPDATE_URL);
            updatePrerequisitesProcessor.execute();
        }

        if(!doesConsequencesExist(consequencesName)) {
            String insertConsequencesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + consequencesName + ""
                    + "        a pre:Consequences ; "
                    + "        pre:name \"" + consequencesContent + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateConsequencesRequest = UpdateFactory.create(insertConsequencesString);
            System.setProperty("http.maxConnections", "10000");
            UpdateProcessor updateConsequencesProcessor = UpdateExecutionFactory.createRemote(updateConsequencesRequest, UPDATE_URL);
            updateConsequencesProcessor.execute();
        }

        if(!doesWeaknessesExist(weaknessesName)) {
            String insertWeaknessesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + weaknessesName + ""
                    + "        a pre:Weaknesses ; "
                    + "        pre:name \"" + weaknessesContent + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateWeaknessesRequest = UpdateFactory.create(insertWeaknessesString);
            System.setProperty("http.maxConnections", "10000");
            UpdateProcessor updateWeaknessesProcessor = UpdateExecutionFactory.createRemote(updateWeaknessesRequest, UPDATE_URL);
            updateWeaknessesProcessor.execute();
        }

        if(!doesMitigationsExist(mitigationsName)) {
            String insertMitigationsString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + mitigationsName + ""
                    + "        a pre:Mitigations ; "
                    + "        pre:name \"" + mitigationsContent + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateMitigationsRequest = UpdateFactory.create(insertMitigationsString);
            System.setProperty("http.maxConnections", "10000");
            UpdateProcessor updateMitigationsProcessor = UpdateExecutionFactory.createRemote(updateMitigationsRequest, UPDATE_URL);
            updateMitigationsProcessor.execute();
        }

        attack.setName(name);
        return attack;
    }

    private boolean doesPrerequisitesExist(String prerequisitesName) {
        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?prerequisitesName "
                + "WHERE {"
                + "    ?prerequisites a pre:Prerequisites ;"
                + "        pre:name ?prerequisitesName ."
                + "}";
        Query query = QueryFactory.create(queryString) ;
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect() ;
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;
                Literal literal = solution.getLiteral("prerequisitesName");
                if(literal.getString().equals(prerequisitesName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean doesConsequencesExist(String consequencesName) {
        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?consequencesName "
                + "WHERE {"
                + "    ?consequences a pre:Consequences ;"
                + "        pre:name ?consequencesName ."
                + "}";
        Query query = QueryFactory.create(queryString) ;
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect() ;
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;
                Literal literal = solution.getLiteral("consequencesName");
                if(literal.getString().equals(consequencesName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean doesWeaknessesExist(String weaknessesName) {
        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?weaknessesName "
                + "WHERE {"
                + "    ?weaknesses a pre:Weaknesses ;"
                + "        pre:name ?weaknessesName ."
                + "}";
        Query query = QueryFactory.create(queryString) ;
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect() ;
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;
                Literal literal = solution.getLiteral("weaknessesName");
                if(literal.getString().equals(weaknessesName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean doesMitigationsExist(String mitigationsName) {
        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?mitigationsName "
                + "WHERE {"
                + "    ?mitigations a pre:Mitigations ;"
                + "        pre:name ?mitigationsName ."
                + "}";
        Query query = QueryFactory.create(queryString) ;
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect() ;
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;
                Literal literal = solution.getLiteral("mitigationsName");
                if(literal.getString().equals(mitigationsName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean doesIdExist(int id) {
        // SELECT
        String queryString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "SELECT ?attackId "
                + "WHERE {"
                + "    ?attack a pre:Attack ;"
                + "        pre:id ?attackId ."
                + "}";
        Query query = QueryFactory.create(queryString) ;
        try {
            System.setProperty("http.maxConnections", "10000");
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect() ;
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;
                Literal literal = solution.getLiteral("attackId");
                if(Integer.parseInt(literal.getString()) == id) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
