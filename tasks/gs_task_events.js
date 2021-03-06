// -----------------------------------------------------------------------------
// GET TASKS LIST
// -----------------------------------------------------------------------------
/*function G_Save_Changes_In_Task_Details_On_Server( _fileId, ___openned_for_edit_tasks, __sender ){
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
}*/

// -----------------------------------------------------------------------------
// ADD JOURNAL EVENT AND SAVE
// -----------------------------------------------------------------------------
function G_ADD_JOURNAL_EVENT_AND_SAVE
  (
     _fileId, 
     _taskid, 
     __date, 
     __event, 
     __comment, 
     __sender, 
     __stage 
  ){
  
  var sheet = F_Get_Sheet_By_Name( _fileId, __stage );
  var data = sheet.getDataRange().getValues();
  var new_event = {
    date: __date,
    event: __event,
    comment: __comment,
    sender: __sender
  };
  var _events = [];
  for( var i=0;i<data.length;i++ ){
    if( data[i][0] == _taskid ){
      Logger.log( "G_ADD_JOURNAL_EVENT_AND_SAVE" );
      Logger.log( data[i][10] );
      
      if(data[i][10] == null || data[i][10] == "" ){
        _events = [];
      }
      else _events = JSON.parse( data[i][10] );
      _events.push( new_event );
      
      Logger.log( _events );
      sheet.getRange( i+1, 11 ).setValue( JSON.stringify( _events) );
      return G_UpdateTasksList( _fileId )
    }
  }
  throw( "ERROR. G_ADD_JOURNAL_EVENT_AND_SAVE" )
}

// -----------------------------------------------------------------------------
// ADD JOURNAL EVENT -- COMMENT
// -----------------------------------------------------------------------------
function G_Add_Note_To_Task( 
      _fileId, 
      _listid, 
      _taskid, 
      _note, 
      _sender 
){
  Logger.log( "G_Add_Note_To_Task( _fileId, _massive, _note, _sender )" );
  var sheet = F_Get_Sheet_By_Name( _fileId, "active" );
  var data = sheet.getDataRange().getValues();
  return G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, new Date(), "Adding note", _note, _sender );
}

// -----------------------------------------------------------------------------
// ADD JOURNAL EVENT
// -----------------------------------------------------------------------------
function G_ADD_JOURNAL_EVENT(__massive, __date, __event, __comment, __sender ){
  Logger.log( "G_ADD_JOURNAL_EVENT(__massive, __date, __event, __comment )" );
  Logger.log( __massive );
  var massive = __massive;
  var _event = {
    date: __date,
    event: __event,
    comment: __comment,
    sender: __sender
  }
  massive.push( _event );
  return massive;
}