const onOpen = () => {
  const ui = DocumentApp.getUi();
  ui.createMenu("DTL").addItem("Generate A Copy", "initDTL").addToUi();
};

const initDTL = () => {
  const html = HtmlService.createTemplateFromFile("src/ui/sidebar")
    .evaluate()
    .setTitle("Docs Templating Language");

  DocumentApp.getUi().showSidebar(html);
};
