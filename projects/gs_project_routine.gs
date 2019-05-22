// arrange returns

function G_AddNewProject( _fileId, i_id_new_project_name, i_id_new_project_desc ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "active_projects" );
  var projects = sheet.getDataRange().getValues();
  if( i_id_new_project_name == "" ) return "project name is empty";
  for ( var ip in projects ){
    if( i_id_new_project_name == projects[ip][2] ){
      return "project with this name already exits"; 
    }
  }
  
  var folder = DriveApp.getFolderById(___projectsFolderId).createFolder(DriveApp.getFileById(_fileId).getName()+" = " + i_id_new_project_name );
  var folder_url = folder.getUrl();
  var folder_id = folder.getId();
  var project_id = Math.random().toString(36).substring(9);
  sheet.appendRow([ project_id, new Date(), i_id_new_project_name, JSON.stringify([i_id_new_project_desc]), folder_url, folder_id ])
  return "project is successfully created";
}

function G_UpdateProjectsList( _fileId ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "active_projects" );
  var projects = sheet.getDataRange().getValues();
  return JSON.stringify(projects);
}
