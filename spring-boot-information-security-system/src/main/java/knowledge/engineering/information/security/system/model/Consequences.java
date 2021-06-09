package knowledge.engineering.information.security.system.model;

import ucm.gaia.jcolibri.cbrcore.Attribute;
import ucm.gaia.jcolibri.cbrcore.CaseComponent;

public class Consequences implements CaseComponent {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Consequences{" +
                "name='" + name + '\'' +
                '}';
    }

    @Override
    public Attribute getIdAttribute() {
        return null;
    }

}
