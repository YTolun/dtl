const processSwitchStatements = (document, switchStatementValues) => {
  const handleCases = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractAttributeValue(startTag, codePartialText, syntax.switchStatements.blockStartTag.endsWith);

    processCaseBlocks(document, blockRange, switchStatementValues[variableName]);

    blockStart.getParent().removeFromParent();
    blockEnd.getParent().removeFromParent();
  };

  const regularStartTag = `<dtl:switch=`;
  const regularEndTag = `</dtl:switch>`;

  processCodeBlock(document,  syntax.switchStatements.blockStartTag.beginsWith, syntax.switchStatements.blockEndTag, handleCases);
};
