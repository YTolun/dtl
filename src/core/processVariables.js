const processVariables = (document, variableValues) => {
  // Callback function for the actual proccessing
  const replaceVariable = ({ startTag, blockRange, endTag }) => {
    blockRange.getRangeElements().forEach((rangeElement) => {
      const elementAsText = rangeElement.getElement().asText();

      // Code block might not necessarily be the only thing int he element, so we need to select it.
      const codePartialStart = elementAsText.findText(startTag).getStartOffset();
      const codePartialEnd = elementAsText.findText(endTag).getEndOffsetInclusive();
      const codePartialText = elementAsText.getText().substring(codePartialStart, codePartialEnd + 1);

      // Now extract the variable name from the code block
      const variableName = extractAttributeValue(startTag, codePartialText, endTag);

      elementAsText.replaceText(codePartialText, variableValues[variableName]);
    });
  };


  processCodeBlock(document, syntax.variable.blockStartTag, syntax.variable.blockEndTag, replaceVariable);

  processCodeBlock(document, syntax.variableShortHand.blockStartTag, syntax.variableShortHand.blockEndTag, replaceVariable);
};
