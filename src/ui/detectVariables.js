const detectVariables = () => {
  document = DocumentApp.getActiveDocument();
  let variableList = [];

  // Callback function for the actual proccessing
  const generateVariableList = ({ startTag, blockRange, endTag }) => {
    blockRange.getRangeElements().forEach((rangeElement) => {
      const elementAsText = rangeElement.getElement().asText();

      // Code block might not necessarily be the only thing int he element, so we need to select it.
      const codePartialStart = elementAsText.findText(startTag).getStartOffset();
      const codePartialEnd = elementAsText
        .findText(endTag, elementAsText.findText(startTag))
        .getEndOffsetInclusive();
      const codePartialText = elementAsText.getText().substring(codePartialStart, codePartialEnd + 1);

      // Now extract the variable name from the code block
      const variableName = extractAttributeValue(startTag, codePartialText, endTag);

      variableList.push(variableName);
    });
  };


  processCodeBlock(document, syntax.variable.blockStartTag, syntax.variable.blockEndTag, generateVariableList);

  processCodeBlock(document, syntax.variableShortHand.blockStartTag, syntax.variableShortHand.blockEndTag, generateVariableList);

  variableList = [...new Set(variableList)];
  return variableList;
};
