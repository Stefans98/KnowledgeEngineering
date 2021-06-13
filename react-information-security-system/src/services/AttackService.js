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
}

export default new AttackService();
