const processIfStatements = (document, ifStatementValues) => {
  const toggleElementVisibility = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractAttributeValue(startTag, codePartialText, syntax.ifStatements.blockStartTag.endsWith);

    if (ifStatementValues[variableName]) {
      blockStart.getParent().removeFromParent();
      blockEnd.getParent().removeFromParent();
    } else {
      blockRange.getRangeElements().forEach((rangeElement) => {
        rangeElement.getElement().removeFromParent();
      });
    }
  };

  processCodeBlock(document, syntax.ifStatements.blockStartTag.beginsWith, syntax.ifStatements.blockEndTag, toggleElementVisibility);
};
