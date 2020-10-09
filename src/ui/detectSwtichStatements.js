const detectSwitchStatements = () => {
  document = DocumentApp.getActiveDocument();
  let switchStatementList = [];

  const handleCases = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractAttributeValue(startTag, codePartialText, syntax.switchStatements.blockStartTag.endsWith);

    const caseBlockList = detectCaseBlocks(blockRange);
    const switchStatement = {
      variable: variableName,
      caseBlockList: caseBlockList,
    };

    switchStatementList.push(switchStatement);
  };

  processCodeBlock(document, syntax.switchStatements.blockStartTag.beginsWith, syntax.switchStatements.blockEndTag, handleCases);

  switchStatementList = [...new Set(switchStatementList)];
  return switchStatementList;
};
