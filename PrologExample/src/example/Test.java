package example;

import com.ugos.jiprolog.engine.JIPEngine;
import com.ugos.jiprolog.engine.JIPQuery;
import com.ugos.jiprolog.engine.JIPTerm;
import com.ugos.jiprolog.engine.JIPVariable;

import java.util.ArrayList;
import java.util.List;

public class Test {

	public static void main(String[] args) {
		JIPEngine engine = new JIPEngine();

		engine.consultFile("prolog/rules.pl");
		String attack_name = "manipulating_Opaque_Client_based_Data_Tokens";
		JIPQuery query = engine.openSynchronousQuery("suggestions_by_name(" + attack_name + ", Suggestions)");
		
		// pravila se mogu dodavati i tokom izvrsavanja (u runtime-u)
		// assertz dodaje pravilo na kraj programa (aasserta dodaje na pocetak programa), na primer:
		// engine.assertz(engine.getTermParser().parseTerm("sledbenik(X,Y) :- X is Y+1."));

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

				for(String mitigation : mitigations) {
					System.out.println(mitigation);
				}

				// System.out.println(var.getName() + " = " + var.getValue().toString().replace("_", " "));
			}
		}

	}

}
