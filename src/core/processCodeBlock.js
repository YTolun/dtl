const processCodeBlock = (document, startTag, endTag, callback) => {
  const documentBody = document.getBody();

  let searchResult = documentBody.findText(startTag);
  while (searchResult) {
    let blockStart = searchResult.getElement();

    // Start searching for the text pattern (endTag) after finding the startTag
    let blockEnd = documentBody.findText(endTag, searchResult).getElement();

    const blockRange = document.newRange().addElementsBetween(blockStart, blockEnd);

    callback({ startTag, blockStart, blockRange, blockEnd, endTag });

    searchResult = documentBody.findText(startTag, searchResult);
  }
};
