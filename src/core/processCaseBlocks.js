const processCaseBlocks = (document, switchBlockRange, switchVariableValue) => {
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

    if (switchVariableValue === caseValue) {
      blockStart.getParent().removeFromParent();
      blockEnd.getParent().removeFromParent();
    } else {
      blockRange.getRangeElements().forEach((rangeElement) => {
        rangeElement.getElement().removeFromParent();
      });
    }
  };

  const regularStartTag = `<dtl:case=`;
  const regularEndTag = `</dtl:case>`;

  // We need to loop through the case values in this particular switch statements range
  switchBlockRange.getRangeElements().forEach((rangeElement) => {
    let searchResult = rangeElement.getElement().asText().findText(regularStartTag);

    if (searchResult) {
      let caseBlockStart = searchResult.getElement();
      let caseBlockEnd = document.getBody().findText(regularEndTag).getElement();

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
};
