const extractAttributeValue = (startsWith, codePartialText, endsWith) => {
return codePartialText
    .replace(startsWith, ``)
    .replace(syntax.attribute.startTag, ``)
    .replace(endsWith, ``)
    .replace(syntax.attribute.endTag, ``)
    .trim();
};