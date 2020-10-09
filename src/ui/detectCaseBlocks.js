const detectCaseBlocks = (switchBlockRange) => {
  document = DocumentApp.getActiveDocument();
  let caseBlockList = [];

  // We need to loop through the case values in this particular switch statements range
  switchBlockRange.getRangeElements().forEach((rangeElement) => {
    let searchResult = rangeElement.getElement().asText().findText(syntax.switchStatements.caseBlocks.blockStartTag.beginsWith);

    if (searchResult) {
      let caseBlockStart = searchResult.getElement();

      const codePartialText = caseBlockStart.asText().getText();
      const caseValue = extractAttributeValue(syntax.switchStatements.caseBlocks.blockStartTag.beginsWith, codePartialText, syntax.switchStatements.caseBlocks.blockStartTag.endsWith);
  
      caseBlockList.push(caseValue);
    }
  });
  caseBlockList = [...new Set(caseBlockList)];
  return caseBlockList;
};
