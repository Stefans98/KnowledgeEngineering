package knowledge.engineering.information.security.system.model;

import ucm.gaia.jcolibri.cbrcore.Attribute;
import ucm.gaia.jcolibri.cbrcore.CaseComponent;

public class Attack implements CaseComponent {

    private int id;
    private String name;
    private Level likelihood;
    private Level severity;
    private Prerequisites prerequisites;
    private Consequences consequences;
    private Weaknesses weaknesses;
    private Mitigations mitigations;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Level getLikelihood() {
        return likelihood;
    }

    public void setLikelihood(Level likelihood) {
        this.likelihood = likelihood;
    }

    public Level getSeverity() {
        return severity;
    }

    public void setSeverity(Level severity) {
        this.severity = severity;
    }

    public Prerequisites getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(Prerequisites prerequisites) {
        this.prerequisites = prerequisites;
    }

    public Consequences getConsequences() {
        return consequences;
    }

    public void setConsequences(Consequences consequences) {
        this.consequences = consequences;
    }

    public Weaknesses getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(Weaknesses weaknesses) {
        this.weaknesses = weaknesses;
    }

    public Mitigations getMitigations() {
        return mitigations;
    }

    public void setMitigations(Mitigations mitigations) {
        this.mitigations = mitigations;
    }

    @Override
    public String toString() {
        return "Attack{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", likelihood=" + likelihood +
                ", severity=" + severity +
                ", prerequisites=" + prerequisites +
                ", consequences=" + consequences +
                ", weaknesses=" + weaknesses +
                ", mitigations=" + mitigations +
                '}';
    }

    @Override
    public Attribute getIdAttribute() {
        return null;
    }
}
