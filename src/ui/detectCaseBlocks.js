const detectCaseBlocks = (switchBlockRange, switchVariableValue) => {
  document = DocumentApp.getActiveDocument();
  let caseBlockList = [];

  const extractCaseValue = (codePartialText) => {
    return codePartialText
      .replace(regularStartTag, ``)
      .replace(`"`, ``)
      .replace(`>`, ``)
      .replace(`"`, ``)
      .trim();
  };

  const toggleCaseVisibility = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const caseValue = extractCaseValue(codePartialText);

    caseBlockList.push(caseValue);
  };

  const regularStartTag = `<dtl:case=`;
  const regularEndTag = `</dtl:case>`;

  // We need to loop through the case values in this particular switch statements range
  switchBlockRange.getRangeElements().forEach((rangeElement) => {
    let searchResult = rangeElement.getElement().asText().findText(regularStartTag);

    if (searchResult) {
      let caseBlockStart = searchResult.getElement();
      let caseBlockEnd = document.getBody().findText(regularEndTag, searchResult).getElement();

      const caseBlockRange = document.newRange().addElementsBetween(caseBlockStart, caseBlockEnd);

      toggleCaseVisibility({
        startTag: regularStartTag,
        blockStart: caseBlockStart,
        blockRange: caseBlockRange,
        blockEnd: caseBlockEnd,
        endTag: regularEndTag,
      });
    }
  });
  caseBlockList = [...new Set(caseBlockList)];
  return caseBlockList;
};
