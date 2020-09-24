function newFromTemplate() {
  const template = DocumentApp.getActiveDocument();
  const templateName = template.getName();
  const templateId = template.getId();

  const instance = DriveApp.getFileById(templateId).makeCopy(
    `Instance of ${templateName}`
  );
  const instanceId = instance.getId();

  return instanceId;
}
