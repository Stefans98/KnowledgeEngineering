package connector;

import model.*;
import ucm.gaia.jcolibri.cbrcore.CBRCase;
import ucm.gaia.jcolibri.cbrcore.CaseBaseFilter;
import ucm.gaia.jcolibri.cbrcore.Connector;
import ucm.gaia.jcolibri.exception.InitializingException;
import ucm.gaia.jcolibri.util.FileIO;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.*;

public class CsvConnector implements Connector {
	
	@Override
	public Collection<CBRCase> retrieveAllCases() {
		LinkedList<CBRCase> cases = new LinkedList<CBRCase>();
		
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(FileIO.openFile("data/attacks.csv")));
			if (br == null)
				throw new Exception("Error opening file");

			String line = "";
			while ((line = br.readLine()) != null) {
				if (line.startsWith("#") || (line.length() == 0))
					continue;
				String[] values = line.split(";");

				CBRCase cbrCase = new CBRCase();

				Attack attack = new Attack();

				attack.setId(Integer.parseInt(values[0]));
				attack.setName(values[1]);

				// Likelihood
				if(values[2].equals("low")) {
					attack.setLikelihood(Level.LOW);
				} else if(values[2].equals("medium")) {
					attack.setLikelihood(Level.MEDIUM);
				} else if(values[2].equals("high")) {
					attack.setLikelihood(Level.HIGH);
				}
				// Severity
				if(values[3].equals("low")) {
					attack.setSeverity(Level.LOW);
				} else if(values[3].equals("medium")) {
					attack.setSeverity(Level.MEDIUM);
				} else if(values[3].equals("high")) {
					attack.setSeverity(Level.HIGH);
				}

				List<Prerequisites> prerequisitesList = new ArrayList<Prerequisites>();
				Prerequisites prerequisites = new Prerequisites();
				if(values[4].contains(",")) {
					String[] elements = values[4].split(",");
					for(String el : elements) {
						prerequisites.setName(el);
						prerequisitesList.add(prerequisites);
					}
				} else {
					prerequisites.setName(values[4]);
					prerequisitesList.add(prerequisites);
				}
				attack.setPrerequisites(prerequisitesList);

				List<Consequences> consequencesList = new ArrayList<Consequences>();
				Consequences consequences = new Consequences();
				if(values[5].contains(",")) {
					String[] elements = values[5].split(",");
					for(String el : elements) {
						consequences.setName(el);
						consequencesList.add(consequences);
					}
				} else if(!values[5].equals("unspecified")) {
					consequences.setName(values[5]);
					consequencesList.add(consequences);
				}
				attack.setConsequences(consequencesList);

				List<Weaknesses> weaknessesList = new ArrayList<Weaknesses>();
				Weaknesses weaknesses = new Weaknesses();
				if(values[6].contains(",")) {
					String[] elements = values[6].split(",");
					for(String el : elements) {
						weaknesses.setName(el);
						weaknessesList.add(weaknesses);
					}
				} else if(!values[6].equals("unspecified")) {
					weaknesses.setName(values[6]);
					weaknessesList.add(weaknesses);
				}
				attack.setWeaknesses(weaknessesList);

				List<Mitigations> mitigationsList = new ArrayList<Mitigations>();
				Mitigations mitigations = new Mitigations();
				if(values[7].contains(",")) {
					String[] elements = values[7].split(",");
					for(String el : elements) {
						mitigations.setName(el);
						mitigationsList.add(mitigations);
					}
				} else if(!values[7].equals("unspecified")) {
					mitigations.setName(values[7]);
					mitigationsList.add(mitigations);
				}
				attack.setMitigations(mitigationsList);

				cbrCase.setDescription(attack);
				cases.add(cbrCase);
			}
			br.close();
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