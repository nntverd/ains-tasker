// -----------------------------------------------------------------------------
// GET TASKS LIST
// -----------------------------------------------------------------------------
function G_Save_Changes_In_Task_Details_On_Server( _fileId, ___openned_for_edit_tasks, __sender ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "active" );
  var data = sheet.getDataRange().getValues();
  var openned_for_edit_tasks = JSON.parse( ___openned_for_edit_tasks );
  Logger.log( "G_Save_Changes_In_Task_Details_On_Server" );
  Logger.log( openned_for_edit_tasks );
  var comment = openned_for_edit_tasks.slice(1,10);
//  comment[10] = "";
  for( var i=0;i<data.length;i++ ){
    if( data[i][0] == openned_for_edit_tasks[0] ){
      Logger.log( openned_for_edit_tasks )
      sheet.getRange( i+1, 1, 1, openned_for_edit_tasks.length ).setValues( [openned_for_edit_tasks] );
      return G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, openned_for_edit_tasks[0], new Date(), "Changing Task Details", comment.toString(), __sender );
    }
  }
  throw( "ERROR. G_Save_Changes_In_Task_Details_On_Server" )
}