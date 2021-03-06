const API_URL = "http://localhost:8081/api/bayes";

class BayesReasoningService {
  propagateAttacks(
    networkDisruptionOrDDoS,
    incorrectlyConfiguredFirewalls,
    lossOrTheftOfDevice,
    interactingWithSystem,
    communicationPaths,
    signalLevelAlerts,
    sensitiveInformation,
    covertTimingChannel,
    theftOfData,
    configuration,
    securityChecks,
    identityTheftOrFraud,
    continent,
    industry,
    companySize
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        networkDisruptionOrDDoS,
        incorrectlyConfiguredFirewalls,
        lossOrTheftOfDevice,
        interactingWithSystem,
        communicationPaths,
        signalLevelAlerts,
        sensitiveInformation,
        covertTimingChannel,
        theftOfData,
        configuration,
        securityChecks,
        identityTheftOrFraud,
        continent,
        industry,
        companySize,
      }),
    };

    return fetch(API_URL, requestOptions);
  }
}

export default new BayesReasoningService();
