const processCaseBlocks = (document, switchBlockRange, switchVariableValue) => {
  const toggleCaseVisibility = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const caseValue = extractAttributeValue(startTag, codePartialText, ">");

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
    let searchResult = rangeElement.getElement().asText().findText(syntax.switchStatements.caseBlocks.blockStartTag.beginsWith);

    if (searchResult) {
      let caseBlockStart = searchResult.getElement();
      let caseBlockEnd = document.getBody().findText(syntax.switchStatements.caseBlocks.blockEndTag).getElement();

      const caseBlockRange = document.newRange().addElementsBetween(caseBlockStart, caseBlockEnd);

      toggleCaseVisibility({
        startTag: syntax.switchStatements.caseBlocks.blockStartTag.beginsWith,
        blockStart: caseBlockStart,
        blockRange: caseBlockRange,
        blockEnd: caseBlockEnd,
        endTag: syntax.switchStatements.caseBlocks.blockEndTag,
      });
    }
  });
};
