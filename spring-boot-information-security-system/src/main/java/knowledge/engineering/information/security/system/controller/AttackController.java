package knowledge.engineering.information.security.system.controller;

import knowledge.engineering.information.security.system.model.*;
import org.apache.jena.rdf.model.Resource;
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
            QueryExecution qexec = QueryExecutionFactory.sparqlService(QUERY_URL, query);

            ResultSet results = qexec.execSelect();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution() ;

                Attack attack = new Attack();

                Literal idLiteral = solution.getLiteral("id");
                // System.out.println(attackName.getString());
                attack.setId(Integer.parseInt(idLiteral.getString()));

                Literal attackNameLiteral = solution.getLiteral("attackName");
                // System.out.println(attackName.getString());
                attack.setName(attackNameLiteral.getString());

                Literal likelihoodLiteral = solution.getLiteral("likelihood");
                // System.out.println(likelihood.getString());
                if(likelihoodLiteral.getString().equals("0")) {
                    attack.setLikelihood(Level.Low);
                } else if(likelihoodLiteral.getString().equals("1")) {
                    attack.setLikelihood(Level.Medium);
                } else if(likelihoodLiteral.getString().equals("2")) {
                    attack.setLikelihood(Level.High);
                }

                Literal severityLiteral = solution.getLiteral("severity");
                // System.out.println(severity.getString());
                if(severityLiteral.getString().equals("0")) {
                    attack.setSeverity(Level.Low);
                } else if(severityLiteral.getString().equals("1")) {
                    attack.setSeverity(Level.Medium);
                } else if(severityLiteral.getString().equals("2")) {
                    attack.setSeverity(Level.High);
                }

                Literal prerequisitesLiteral = solution.getLiteral("prerequisitesName");
                // System.out.println(prerequisitesLiteral.getString());
                Prerequisites prerequisites = new Prerequisites();
                prerequisites.setName(prerequisitesLiteral.getString());
                attack.setPrerequisites(prerequisites);

                Literal consequencesLiteral = solution.getLiteral("consequencesName");
                // System.out.println(consequencesLiteral.getString());
                Consequences consequences = new Consequences();
                consequences.setName(consequencesLiteral.getString());
                attack.setConsequences(consequences);

                Literal weaknessesLiteral = solution.getLiteral("weaknessesName");
                // System.out.println(weaknessesLiteral.getString());
                Weaknesses weaknesses = new Weaknesses();
                weaknesses.setName(weaknessesLiteral.getString());
                attack.setWeaknesses(weaknesses);

                Literal mitigationsLiteral = solution.getLiteral("mitigationsName");
                // System.out.println(mitigationsLiteral.getString());
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
    public ResponseEntity<Attack> addAttack(@RequestBody Attack attack) {

        Random random = new Random();
        int id = random.nextInt(900) + 100;;
        while(doesIdExist(id)) {
            id = random.nextInt(900) + 100;
        }

        String name = "attack_" + new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());

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
        if(attack.getPrerequisites() != null) {
            prerequisitesName = attack.getPrerequisites().getName();
        }

        String consequencesName = "unspecified_consequences";
        if(attack.getConsequences() != null) {
            consequencesName = attack.getConsequences().getName();
        }

        String weaknessesName = "unspecified_weaknesses";
        if(attack.getWeaknesses() != null) {
            weaknessesName = attack.getWeaknesses().getName();
        }

        String mitigationsName = "unspecified_mitigations";
        if(attack.getMitigations() != null) {
            mitigationsName = attack.getMitigations().getName();
        }

//        String mitigations = "";
//        if(attack.getMitigations() != null) {
//            mitigations = attack.getMitigations().getName();
//        }

        String insertString = ""
                + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                + "INSERT DATA {"
                + "    pre:" + name + ""
                + "        a pre:Attack ; "
                + "        pre:id \"" + id + "\"^^xsd:int ; "
                + "        pre:name \"" + name + "\"^^xsd:string ; "
                + "        pre:likelihood \"" + likelihood + "\"^^xsd:int ; "
                + "        pre:severity \"" + severity + "\"^^xsd:int ; "
                + "        pre:prerequisites pre:" + id + "_" + prerequisitesName + " ; "
                + "        pre:consequences pre:" + id + "_" + consequencesName + " ; "
                + "        pre:weaknesses pre:" + id + "_" + weaknessesName + " ; "
                + "        pre:mitigations pre:" + id + "_" + mitigationsName + ". "
                + "}";
        UpdateRequest updateRequest = UpdateFactory.create(insertString);
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(updateRequest, UPDATE_URL);
        updateProcessor.execute();

        if(!doesPrerequisitesExist(prerequisitesName)) {
            String insertPrerequisitesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + id + "_" + prerequisitesName + ""
                    + "        a pre:Prerequisites ; "
                    + "        pre:name \"" + id + "_" + prerequisitesName + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updatePrerequisitesRequest = UpdateFactory.create(insertPrerequisitesString);
            UpdateProcessor updatePrerequisitesProcessor = UpdateExecutionFactory.createRemote(updatePrerequisitesRequest, UPDATE_URL);
            updatePrerequisitesProcessor.execute();
        }

        if(!doesConsequencesExist(consequencesName)) {
            String insertConsequencesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + id + "_" + consequencesName + ""
                    + "        a pre:Consequences ; "
                    + "        pre:name \"" + id + "_" + consequencesName + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateConsequencesRequest = UpdateFactory.create(insertConsequencesString);
            UpdateProcessor updateConsequencesProcessor = UpdateExecutionFactory.createRemote(updateConsequencesRequest, UPDATE_URL);
            updateConsequencesProcessor.execute();
        }

        if(!doesWeaknessesExist(weaknessesName)) {
            String insertWeaknessesString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + id + "_" + weaknessesName + ""
                    + "        a pre:Weaknesses ; "
                    + "        pre:name \"" + id + "_" + weaknessesName + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateWeaknessesRequest = UpdateFactory.create(insertWeaknessesString);
            UpdateProcessor updateWeaknessesProcessor = UpdateExecutionFactory.createRemote(updateWeaknessesRequest, UPDATE_URL);
            updateWeaknessesProcessor.execute();
        }

        if(!doesMitigationsExist(mitigationsName)) {
            String insertMitigationsString = ""
                    + "PREFIX pre: <https://github.com/Stefans98/KnowledgeEngineering#> "
                    + "PREFIX xsd: <http://w3.org/2001/XMLSchema#> "
                    + "INSERT DATA {"
                    + "    pre:" + id + "_" + mitigationsName + ""
                    + "        a pre:Mitigations ; "
                    + "        pre:name \"" + id + "_" + mitigationsName + "\"^^xsd:string. "
                    + "}";
            UpdateRequest updateMitigationsRequest = UpdateFactory.create(insertMitigationsString);
            UpdateProcessor updateMitigationsProcessor = UpdateExecutionFactory.createRemote(updateMitigationsRequest, UPDATE_URL);
            updateMitigationsProcessor.execute();
        }

        return new ResponseEntity<>(attack, HttpStatus.OK);
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
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(updateRequest, UPDATE_URL);
        updateProcessor.execute();

        return new ResponseEntity<>(HttpStatus.OK);
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
