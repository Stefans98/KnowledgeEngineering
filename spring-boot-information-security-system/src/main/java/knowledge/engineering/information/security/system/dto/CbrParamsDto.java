package knowledge.engineering.information.security.system.dto;

import java.util.List;

public class CbrParamsDto {
    private List<String> prerequisites;
    private List<String> consequences;
    private List<String> mitigations;
    private List<String> weaknesses;

    public CbrParamsDto() {
    }

    public List<String> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(List<String> prerequisites) {
        this.prerequisites = prerequisites;
    }

    public List<String> getConsequences() {
        return consequences;
    }

    public void setConsequences(List<String> consequences) {
        this.consequences = consequences;
    }

    public List<String> getMitigations() {
        return mitigations;
    }

    public void setMitigations(List<String> mitigations) {
        this.mitigations = mitigations;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }
}
