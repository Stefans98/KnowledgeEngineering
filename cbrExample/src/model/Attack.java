package model;

import ucm.gaia.jcolibri.cbrcore.Attribute;
import ucm.gaia.jcolibri.cbrcore.CaseComponent;

import java.util.List;

public class Attack implements CaseComponent {

    private int id;
    private String name;
    private Level likelihood;
    private Level severity;
    private List<Prerequisites> prerequisites;
    private List<Consequences> consequences;
    private List<Weaknesses> weaknesses;
    private List<Mitigations> mitigations;

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

    public List<Prerequisites> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(List<Prerequisites> prerequisites) {
        this.prerequisites = prerequisites;
    }

    public List<Consequences> getConsequences() {
        return consequences;
    }

    public void setConsequences(List<Consequences> consequences) {
        this.consequences = consequences;
    }

    public List<Weaknesses> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<Weaknesses> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<Mitigations> getMitigations() {
        return mitigations;
    }

    public void setMitigations(List<Mitigations> mitigations) {
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
