package knowledge.engineering.information.security.system.connector;

import knowledge.engineering.information.security.system.model.*;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Literal;
import ucm.gaia.jcolibri.cbrcore.CBRCase;
import ucm.gaia.jcolibri.cbrcore.CaseBaseFilter;
import ucm.gaia.jcolibri.cbrcore.Connector;
import ucm.gaia.jcolibri.exception.InitializingException;
import ucm.gaia.jcolibri.util.FileIO;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Collection;
import java.util.LinkedList;

public class RDFConnector implements Connector {

    private static final String QUERY_URL = "http://localhost:3030/attacks_dataset/sparql";

    @Override
    public Collection<CBRCase> retrieveAllCases() {
        LinkedList<CBRCase> cases = new LinkedList<CBRCase>();

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

                CBRCase cbrCase = new CBRCase();

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
                // System.out.println(severity.getString());
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

                cbrCase.setDescription(attack);
                cases.add(cbrCase);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cases;
    }

    @Override
    public Collection<CBRCase> retrieveSomeCases(CaseBaseFilter arg0) {
        return null;
    }

    @Override
    public void storeCases(Collection<CBRCase> arg0) {
    }

    @Override
    public void close() {
    }

    @Override
    public void deleteCases(Collection<CBRCase> arg0) {
    }

    @Override
    public void initFromXMLfile(URL arg0) throws InitializingException {
    }

}

