const API_URL = "http://localhost:8081/api/prolog";

class PrologService {
  getMitigations(attackName) {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return fetch(API_URL + "/mitigations/" + attackName, requestOptions);
  }
}

export default new PrologService();
