package knowledge.engineering.information.security.system.cbr;

import knowledge.engineering.information.security.system.connector.CsvConnector;
import knowledge.engineering.information.security.system.connector.RDFConnector;
import knowledge.engineering.information.security.system.dto.CbrDto;
import knowledge.engineering.information.security.system.model.*;
import org.springframework.stereotype.Service;
import ucm.gaia.jcolibri.casebase.LinealCaseBase;
import ucm.gaia.jcolibri.cbraplications.StandardCBRApplication;
import ucm.gaia.jcolibri.cbrcore.*;
import ucm.gaia.jcolibri.exception.ExecutionException;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.NNConfig;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.NNScoringMethod;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.global.Average;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.EnumDistance;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.MaxString;
import ucm.gaia.jcolibri.method.retrieve.RetrievalResult;
import ucm.gaia.jcolibri.method.retrieve.selection.SelectCases;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CbrApplication implements StandardCBRApplication {

    Connector _connector;  /** Connector object */
    CBRCaseBase _caseBase;  /** CaseBase object */

    NNConfig simConfig;  /** KNN configuration */

    List<CbrDto> result = new ArrayList<CbrDto>();

    public List<CbrDto> getResult() {
        return result;
    }

    public void setResult(List<CbrDto> result) {
        this.result = result;
    }

    public void configure() throws ExecutionException {
        //_connector =  new CsvConnector(); // From CSV
        _connector =  new RDFConnector(); // From RDF

        _caseBase = new LinealCaseBase();  // Create a Lineal case base for in-memory organization

        simConfig = new NNConfig(); // KNN configuration
        simConfig.setDescriptionSimFunction(new Average());  // global similarity function = average

        simConfig.addMapping(new Attribute("likelihood", Attack.class), new EnumDistance());
        simConfig.addMapping(new Attribute("severity", Attack.class), new EnumDistance());
        simConfig.addMapping(new Attribute("prerequisites", Attack.class), new Average());
        simConfig.addMapping(new Attribute("name", Prerequisites.class), new MaxString());
        simConfig.addMapping(new Attribute("consequences", Attack.class), new Average());
        simConfig.addMapping(new Attribute("name", Consequences.class), new MaxString());
        simConfig.addMapping(new Attribute("weaknesses", Attack.class), new Average());
        simConfig.addMapping(new Attribute("name", Weaknesses.class), new MaxString());
        simConfig.addMapping(new Attribute("mitigations", Attack.class), new Average());
        simConfig.addMapping(new Attribute("name", Mitigations.class), new MaxString());

        // Equal - returns 1 if both individuals are equal, otherwise returns 0
        // Interval - returns the similarity of two number inside an interval: sim(x,y) = 1-(|x-y|/interval)
        // Threshold - returns 1 if the difference between two numbers is less than a threshold, 0 in the other case
        // EqualsStringIgnoreCase - returns 1 if both String are the same despite case letters, 0 in the other case
        // MaxString - returns a similarity value depending of the biggest substring that belong to both strings
        // EnumDistance - returns the similarity of two enum values as the their distance: sim(x,y) = |ord(x) - ord(y)|
        // EnumCyclicDistance - computes the similarity between two enum values as their cyclic distance
        // Table - uses a table to obtain the similarity between two values. Allowed values are Strings or Enums. The table is read from a text file.
        // TableSimilarity(List<String> values).setSimilarity(value1,value2,similarity)
    }

    public CBRCaseBase preCycle() throws ExecutionException {
        _caseBase.init(_connector);
//        Collection<CBRCase> cases = _caseBase.getCases();
//        for (CBRCase c: cases)
//            System.out.println(c.getDescription());
        return _caseBase;
    }

    public void postCycle() throws ExecutionException {

    }

    public void cycle(CBRQuery query) throws ExecutionException {
        Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(_caseBase.getCases(), query, simConfig);
        eval = SelectCases.selectTopKRR(eval, 5);
        // System.out.println("Retrieved cases:");
        List<CbrDto> result = new ArrayList<CbrDto>();
        for (RetrievalResult nse : eval) {
            // System.out.println(nse.get_case().getDescription() + " -> " + nse.getEval());
            CbrDto cbrDto = new CbrDto();

            String attackString = nse.get_case().getDescription().toString();
            int namePosition = attackString.indexOf("name");
            String substring = attackString.substring(namePosition + 6, nse.get_case().getDescription().toString().length());
            String[] parts = substring.split("'");
            String attackName = parts[0];

            cbrDto.setAttackName(attackName);
            cbrDto.setSimilarity(Math.round(nse.getEval() * 10000.0) / 10000.0);

            result.add(cbrDto);
        }
        setResult(result);
    }

    public List<CbrDto> cbrResult(Level likelihood, Level severity, String prerequisites, String consequences, String weaknesses, String mitigations) {
        recommend(likelihood, severity, prerequisites, consequences, weaknesses, mitigations);
        return getResult();
    }

    public void recommend(Level likelihood, Level severity, String p, String c, String w, String m) {
        // StandardCBRApplication recommender = new CbrApplication();
        try {
            this.configure();

            this.preCycle();

            CBRQuery query = new CBRQuery();

            Attack attack = new Attack();

            attack.setLikelihood(likelihood);
            attack.setSeverity(severity);

            Prerequisites prerequisites = new Prerequisites();
            prerequisites.setName(p);
            attack.setPrerequisites(prerequisites);

            Consequences consequences = new Consequences();
            consequences.setName(c);
            attack.setConsequences(consequences);

            Weaknesses weaknesses = new Weaknesses();
            weaknesses.setName(w);
            attack.setWeaknesses(weaknesses);

            Mitigations mitigations = new Mitigations();
            mitigations.setName(m);
            attack.setMitigations(mitigations);

            query.setDescription( attack );
            this.cycle(query);

            this.postCycle();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
