const processVariables = (document) => {
  const extractVariableName = (startTag, codePartialText, endTag) => {
    return codePartialText
      .replace(startTag, ``)
      .replace(`"`, ``)
      .replace(endTag, ``)
      .replace(`"`, ``)
      .trim();
  };

  // Callback function for the actual proccessing
  const replaceVariable = ({ startTag, blockRange, endTag }) => {
    blockRange.getRangeElements().forEach((rangeElement) => {
      const elementAsText = rangeElement.getElement().asText();

      // Code block might not necessarily be the only thing int he element, so we need to select it.
      const codePartialStart = elementAsText.findText(startTag).getStartOffset();
      const codePartialEnd = elementAsText.findText(endTag).getEndOffsetInclusive();
      const codePartialText = elementAsText.getText().substring(codePartialStart, codePartialEnd + 1);

      // Now extract the variable name from the code block
      const variableName = extractVariableName(startTag, codePartialText, endTag);

      elementAsText.replaceText(codePartialText, vars[variableName]);
    });
  };

  // Define code block as <dtl:print="variable" />
  const regularStartTag = `<dtl:print=`;
  const regularEndTag = `/>`;

  processCodeBlock(document, regularStartTag, regularEndTag, replaceVariable);

  // Shorthand as <dtl="variable" />
  const shorthandStartTag = `<dtl=`;
  const shorthandEndTag = `/>`;

  processCodeBlock(document, shorthandStartTag, shorthandEndTag, replaceVariable);
};

const vars = {
  yuksel: "Yüksel Tolun",
  mert: "Random Guy",
  perry: "Agent P",
};
