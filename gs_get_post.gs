var __fileId = "";

//***************************************************************
// Сервисная функция для HTML
// Включает в указанной точке содержимое файла из проекта
// include('filename'); <?!= include( 'style' ); ?>
//***************************************************************
function include(filename) {
  return HtmlService.createTemplateFromFile(filename).getRawContent();
}
//***************************************************************
// Сервисная функция для HTML
// Запускает index file передавая определенные параметры
//***************************************************************
function doGet(e){
  var ProjectTitle = "Mенеджер задач компании"
  var par_adm = e.parameters.adm;
  var htmlTemplate = HtmlService.createTemplateFromFile('empty');
  if( par_adm == 1 ){
    htmlTemplate = HtmlService.createTemplateFromFile('adm');
  }
  var par_id = e.parameters.id;
  if( F_Get_File_By_Desc(par_id) ){
    htmlTemplate = HtmlService.createTemplateFromFile('comp');
  }
//  G_MOVE_FROM_ACTIVE_TO_CONTROL("1HzUAzNaAEp0nvMOLS9D_KBJPxhvRZseLmZlK9bD6e34", "0.e6ajr1k0liv", "" )
  var htmlOutput = htmlTemplate.evaluate().setTitle(ProjectTitle).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);                             
  return htmlOutput; 
}

//***************************************************************
// Getting file by description
//***************************************************************
function F_Get_File_By_Desc(_desc){
  var folder = DriveApp.getFolderById(___databaseFolderId);
  var files = folder.getFiles();
  var files_list = [];
  while( files.hasNext()){
    var file = files.next();
    var desc = file.getDescription();
    if( desc == _desc ){
      __fileId = file.getId();
      return true;
    }
  }
  return false;
}

