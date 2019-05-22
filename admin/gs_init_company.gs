// ======================================================================
// Function of new company registration
// ======================================================================
function F_Create_Company(_name) {
  Logger.log( "Create company" )
  var folder = DriveApp.getFolderById(___databaseFolderId);
  var files = folder.getFiles();
  while( files.hasNext()){
    if( files.next().getName() == _name ) {
      return ["Company with this name is already exists",0];
    }
  }
  var desc = "" + Math.random().toString(36).substring(9)
  var file = DriveApp.getFileById( ___sheetTemplateId ).makeCopy(_name, folder).setDescription( desc );
  G_Add_New_User( file.getId(), "admin", "nn.tverd@ains.kz", "132456" )
  return ["New company was successfully registered", file.getId()];
}


// ======================================================================
// Function of initialization of new sheet in spreadsheet 
// ======================================================================
function F_Init_Sheet( _sheet_id, _sheetName ){
  return SpreadsheetApp.openById(_sheet_id).insertSheet(_sheetName);
}


// ======================================================================
// Function of getting sheet by name
// ======================================================================
function F_Get_Sheet_By_Name( _sheet_id, _sheetName ){
  var sheets = SpreadsheetApp.openById(_sheet_id).getSheets();
  for( var ish in sheets ){
    if( sheets[ish].getName() == _sheetName ){
      return sheets[ish];
    }
  }
  return F_Init_Sheet( _sheet_id, _sheetName );
}

// ======================================================================
// Testing Function
// ======================================================================
function test_gs_init_company(  ){
  F_Create_Company( "vadfjdksahf" );
  F_Get_Sheet_By_Name( "1TlAjRGORlveB44Ha8sW5yV3ha0ewZpGzWic55Ir-LYY", "_sheetName" )
}


// ======================================================================
// Login Function
// ======================================================================
function G_Adm_Login( _lgn, _pwd ){
  if( _lgn == "123" && _pwd == "qwe" ){
    return 0;
  }
  return -1;
}


// ======================================================================
// Login Function
// ======================================================================
function F_Get_Company_List(  ){
  var folder = DriveApp.getFolderById(___databaseFolderId);
  var files = folder.getFiles();
  var files_list = [];
  while( files.hasNext()){
    var file = files.next();
    var row = [];
    row.push( file.getName() );
    row.push( "https://script.google.com/macros/s/AKfycbwPN2M1FUEAJ084Xr0ouZMUrR-vZvjhEOm7UJYsOLg/dev?id=" + file.getDescription() );
    row.push( "https://script.google.com/macros/s/AKfycbyWJiXgIQSXRtNkRQc87JMiW2ubC3Ge5HchQr7HN6EZBsDHiek/exec?id=" + file.getDescription() );
    files_list.push( row );
  }
  return files_list;
}