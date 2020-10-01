function app() {
  const instanceId = newFromTemplate();
  const instanceDocument = DocumentApp.openById(instanceId);

  processVariables(instanceDocument);
  processIfStatements(instanceDocument);
  processSwitchStatements(instanceDocument);
}
