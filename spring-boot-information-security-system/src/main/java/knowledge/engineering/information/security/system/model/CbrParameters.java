package knowledge.engineering.information.security.system.model;

public class CbrParameters {
    private int likelihood;
    private int severity;
    private String prerequisites;
    private String consequences;
    private String weaknesses;
    private String mitigations;

    public CbrParameters() {
    }

    public int getLikelihood() {
        return likelihood;
    }

    public void setLikelihood(int likelihood) {
        this.likelihood = likelihood;
    }

    public int getSeverity() {
        return severity;
    }

    public void setSeverity(int severity) {
        this.severity = severity;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getConsequences() {
        return consequences;
    }

    public void setConsequences(String consequences) {
        this.consequences = consequences;
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }

    public String getMitigations() {
        return mitigations;
    }

    public void setMitigations(String mitigations) {
        this.mitigations = mitigations;
    }
}
