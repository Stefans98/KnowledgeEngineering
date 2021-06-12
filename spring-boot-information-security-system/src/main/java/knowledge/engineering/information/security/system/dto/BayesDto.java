package knowledge.engineering.information.security.system.dto;

public class BayesDto {
    String attackName;
    float itHappenPercentage;

    public BayesDto() {
    }

    public String getAttackName() {
        return attackName;
    }

    public void setAttackName(String attackName) {
        this.attackName = attackName;
    }

    public float getItHappenPercentage() {
        return itHappenPercentage;
    }

    public void setItHappenPercentage(float itHappenPercentage) {
        this.itHappenPercentage = itHappenPercentage;
    }
}
