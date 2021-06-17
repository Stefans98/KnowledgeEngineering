const API_URL = "http://localhost:8081/api/attack";

class AttackService {
  getAttacks() {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return fetch(API_URL, requestOptions);
  }

  saveAttack(
    likelihoodValue,
    severityValue,
    prerequisitesName,
    consequencesName,
    weaknessesName,
    mitigationsName
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        likelihood: likelihoodValue,
        severity: severityValue,
        prerequisites: {
          name: prerequisitesName,
        },
        consequences: {
          name: consequencesName,
        },
        weaknesses: {
          name: weaknessesName,
        },
        mitigations: {
          name: mitigationsName,
        },
      }),
    };

    return fetch(API_URL, requestOptions);
  }

  changeAttack(
    attackName,
    likelihoodValue,
    severityValue,
    prerequisitesName,
    consequencesName,
    weaknessesName,
    mitigationsName
  ) {
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: attackName,
        likelihood: likelihoodValue,
        severity: severityValue,
        prerequisites: {
          name: prerequisitesName,
        },
        consequences: {
          name: consequencesName,
        },
        weaknesses: {
          name: weaknessesName,
        },
        mitigations: {
          name: mitigationsName,
        },
      }),
    };

    return fetch(API_URL, requestOptions);
  }

  deleteAttack(attackName) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name: attackName }),
    };

    return fetch(API_URL, requestOptions);
  }
}

export default new AttackService();
