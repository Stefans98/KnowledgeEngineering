package cbr;

import connector.CsvConnector;
import model.*;
import ucm.gaia.jcolibri.casebase.LinealCaseBase;
import ucm.gaia.jcolibri.cbraplications.StandardCBRApplication;
import ucm.gaia.jcolibri.cbrcore.*;
import ucm.gaia.jcolibri.exception.ExecutionException;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.NNConfig;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.NNScoringMethod;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.global.Average;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.EnumDistance;
import ucm.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.Equal;
import ucm.gaia.jcolibri.method.retrieve.RetrievalResult;
import ucm.gaia.jcolibri.method.retrieve.selection.SelectCases;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CbrApplication implements StandardCBRApplication {
	
	Connector _connector;  /** Connector object */
	CBRCaseBase _caseBase;  /** CaseBase object */

	NNConfig simConfig;  /** KNN configuration */
	
	public void configure() throws ExecutionException {
		_connector =  new CsvConnector();
		
		_caseBase = new LinealCaseBase();  // Create a Lineal case base for in-memory organization

		simConfig = new NNConfig(); // KNN configuration
		simConfig.setDescriptionSimFunction(new Average());  // global similarity function = average

		simConfig.addMapping(new Attribute("likelihood", Attack.class), new EnumDistance());
		simConfig.addMapping(new Attribute("severity", Attack.class), new EnumDistance());
		simConfig.addMapping(new Attribute("prerequisites", Attack.class), new Average());
		simConfig.addMapping(new Attribute("name", Prerequisites.class), new Equal());
		simConfig.addMapping(new Attribute("consequences", Attack.class), new Average());
		simConfig.addMapping(new Attribute("name", Consequences.class), new Equal());
		simConfig.addMapping(new Attribute("weaknesses", Attack.class), new Average());
		simConfig.addMapping(new Attribute("name", Weaknesses.class), new Equal());
		simConfig.addMapping(new Attribute("mitigations", Attack.class), new Average());
		simConfig.addMapping(new Attribute("name", Mitigations.class), new Equal());

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

	public void cycle(CBRQuery query) throws ExecutionException {
		Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(_caseBase.getCases(), query, simConfig);
		eval = SelectCases.selectTopKRR(eval, 5);
		System.out.println("Retrieved cases:");
		for (RetrievalResult nse : eval)
			System.out.println(nse.get_case().getDescription() + " -> " + nse.getEval());
	}

	public void postCycle() throws ExecutionException {
		
	}

	public CBRCaseBase preCycle() throws ExecutionException {
		_caseBase.init(_connector);
		Collection<CBRCase> cases = _caseBase.getCases();
		for (CBRCase c: cases)
			System.out.println(c.getDescription());
		return _caseBase;
	}

	public static void main(String[] args) {
		StandardCBRApplication recommender = new CbrApplication();
		try {
			recommender.configure();

			recommender.preCycle();

			CBRQuery query = new CBRQuery();

			Attack attack = new Attack();

			List<Prerequisites> prerequisitesList = new ArrayList<Prerequisites>();
			List<Consequences> consequencesList = new ArrayList<Consequences>();
			List<Weaknesses> weaknessesList = new ArrayList<Weaknesses>();
			List<Mitigations> mitigationsList = new ArrayList<Mitigations>();

			Prerequisites prerequisites = new Prerequisites();
			prerequisites.setName("target_relying_on_valid_GPS_signal");
			Consequences consequences = new Consequences();
			consequences.setName("unspecified");
			Weaknesses weaknesses = new Weaknesses();
			weaknesses.setName("insufficient_Verification_of_Data_Authenticity");
			Mitigations mitigations = new Mitigations();
			mitigations.setName("commercial_defensive_technology_that_monitors_for_rogue_WiFi_access_points_man_in_the_middle_attacks_and_anomalous_activity_with_the_mobile_device_baseband_radios");

			prerequisitesList.add(prerequisites);
			consequencesList.add(consequences);
			weaknessesList.add(weaknesses);
			mitigationsList.add(mitigations);

			attack.setLikelihood(Level.LOW);
			attack.setSeverity(Level.HIGH);

			attack.setPrerequisites(prerequisitesList);
			attack.setConsequences(consequencesList);
			attack.setWeaknesses(weaknessesList);
			attack.setMitigations(mitigationsList);

			query.setDescription( attack );
			recommender.cycle(query);

			recommender.postCycle();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}