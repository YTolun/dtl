const processIfStatements = (document, ifStatementValues) => {
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

    if (ifStatementValues[variableName]) {
      blockStart.getParent().removeFromParent();
      blockEnd.getParent().removeFromParent();
    } else {
      blockRange.getRangeElements().forEach((rangeElement) => {
        rangeElement.getElement().removeFromParent();
      });
    }
  };

  const regularStartTag = `<dtl:if=`;
  const regularEndTag = `</dtl:if>`;

  processCodeBlock(document, regularStartTag, regularEndTag, toggleElementVisibility);
};
