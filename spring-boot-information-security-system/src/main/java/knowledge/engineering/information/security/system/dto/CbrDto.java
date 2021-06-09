package knowledge.engineering.information.security.system.dto;

public class CbrDto {

    private String attackName;
    private double similarity;

    public CbrDto() {
    }

    public String getAttackName() {
        return attackName;
    }

    public void setAttackName(String attackName) {
        this.attackName = attackName;
    }

    public double getSimilarity() {
        return similarity;
    }

    public void setSimilarity(double similarity) {
        this.similarity = similarity;
    }
}
