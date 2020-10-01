const processSwitchStatements = (document) => {
  const extractVariableName = (codePartialText) => {
    return codePartialText
      .replace(regularStartTag, ``)
      .replace(`"`, ``)
      .replace(`>`, ``)
      .replace(`"`, ``)
      .trim();
  };

  const handleCases = ({ startTag, blockStart, blockRange, blockEnd, endTag }) => {
    const codePartialText = blockStart.asText().getText();
    const variableName = extractVariableName(codePartialText);

    processCaseBlocks(document, blockRange, switches[variableName]);

    blockStart.getParent().removeFromParent();
    blockEnd.getParent().removeFromParent();
  };

  const regularStartTag = `<dtl:switch=`;
  const regularEndTag = `</dtl:switch>`;

  processCodeBlock(document, regularStartTag, regularEndTag, handleCases);
};

const switches = {
  switchOne: "troy",
  switchTwo: "charles",
};
