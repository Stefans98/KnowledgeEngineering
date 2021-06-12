const API_URL = "http://localhost:8081/api/cbr";

class CaseBaseReasoningService {

    propagate(likelihood, severity, prerequisites, consequences, weaknesses, mitigations) {
            
            const requestOptions = {
                method: "POST",
                headers: { 'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',},
                body: JSON.stringify({ likelihood, severity, prerequisites, consequences, weaknesses, mitigations })
              };
          
              return fetch(API_URL, requestOptions)
    }

}

export default new CaseBaseReasoningService();