package knowledge.engineering.information.security.system.connector;

import knowledge.engineering.information.security.system.model.*;
import ucm.gaia.jcolibri.cbrcore.CBRCase;
import ucm.gaia.jcolibri.cbrcore.CaseBaseFilter;
import ucm.gaia.jcolibri.cbrcore.Connector;
import ucm.gaia.jcolibri.exception.InitializingException;
import ucm.gaia.jcolibri.util.FileIO;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Collection;
import java.util.LinkedList;

public class CsvConnector implements Connector {

    @Override
    public Collection<CBRCase> retrieveAllCases() {
        LinkedList<CBRCase> cases = new LinkedList<CBRCase>();

        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(FileIO.openFile("./src/main/resources/data/attacks.csv")));
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

                Prerequisites prerequisites = new Prerequisites();
                prerequisites.setName(values[4]);
                attack.setPrerequisites(prerequisites);

                Consequences consequences = new Consequences();
                if(!values[5].equals("unspecified")) {
                    consequences.setName(values[5]);
                } else {
                    consequences.setName("");
                }
                attack.setConsequences(consequences);

                Weaknesses weaknesses = new Weaknesses();
                if(!values[6].equals("unspecified")) {
                    weaknesses.setName(values[6]);
                } else {
                    weaknesses.setName("");
                }
                attack.setWeaknesses(weaknesses);

                Mitigations mitigations = new Mitigations();
                if(!values[7].equals("unspecified")) {
                    mitigations.setName(values[7]);
                } else {
                    mitigations.setName("");
                }
                attack.setMitigations(mitigations);

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
