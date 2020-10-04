const detectSwitchStatements = () => {
  document = DocumentApp.getActiveDocument();
  let switchStatementList = [];

  const extractVariableName = (codePartialText) => {
    return codePartialText
      .replace(regularStartTag, ``)
      .replace(`"`, ``)
      .replace(`>`, ``)
      .replace(`"`, ``)
      .trim();
  };

  const handleCases = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractVariableName(codePartialText);

    const caseBlockList = detectCaseBlocks(blockRange, variableName);
    const switchStatement = {
      variable: variableName,
      caseBlockList: caseBlockList,
    };

    switchStatementList.push(switchStatement);
  };

  const regularStartTag = `<dtl:switch=`;
  const regularEndTag = `</dtl:switch>`;

  processCodeBlock(document, regularStartTag, regularEndTag, handleCases);

  switchStatementList = [...new Set(switchStatementList)];
  return switchStatementList;
};
