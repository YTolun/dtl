const generateACopy = ({ variableValues, ifStatementValues, switchStatementValues }) => {
  const instanceId = newFromTemplate();
  const instanceDocument = DocumentApp.openById(instanceId);

  processVariables(instanceDocument, variableValues);
  processIfStatements(instanceDocument, ifStatementValues);
  processSwitchStatements(instanceDocument, switchStatementValues);
};
