const detectIfStatements = () => {
  document = DocumentApp.getActiveDocument();
  let ifStatementList = [];

  const extractVariableName = (codePartialText) => {
    return codePartialText
      .replace(regularStartTag, ``)
      .replace(`"`, ``)
      .replace(`>`, ``)
      .replace(`"`, ``)
      .trim();
  };

  const toggleElementVisibility = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractVariableName(codePartialText);

    ifStatementList.push(variableName);
  };

  const regularStartTag = `<dtl:if=`;
  const regularEndTag = `</dtl:if>`;

  processCodeBlock(document, regularStartTag, regularEndTag, toggleElementVisibility);

  ifStatementList = [...new Set(ifStatementList)];
  return ifStatementList;
};
