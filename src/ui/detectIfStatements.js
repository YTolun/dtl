const detectIfStatements = () => {
  document = DocumentApp.getActiveDocument();
  let ifStatementList = [];

  const toggleElementVisibility = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractAttributeValue(startTag, codePartialText, syntax.ifStatements.blockStartTag.endsWith);

    ifStatementList.push(variableName);
  };

  processCodeBlock(document, syntax.ifStatements.blockStartTag.beginsWith, syntax.ifStatements.blockEndTag, toggleElementVisibility);

  ifStatementList = [...new Set(ifStatementList)];
  return ifStatementList;
};
