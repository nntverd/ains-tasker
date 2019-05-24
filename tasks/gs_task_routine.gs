// -----------------------------------------------------------------------------
// ADD NEW TASK INTO ACTIVE TASKS LIST
// -----------------------------------------------------------------------------
function G_Add_New_Task( _fileId, _i_id_new_task_name, _i_id_new_task_desc,  i_id_new_task_responcer_id, 
                        i_id_new_task_controller_id, i_id_new_task_project_id, i_id_new_task_creator_id,
                       __sender) {
  var sheet = F_Get_Sheet_By_Name( _fileId, "active" );
  var date = new Date();
  var task_id = Math.random().toString(36).substring(0);
  var task_dedline = "";
  var control_deadline = "";
  var events = [];
//  var _event = {
//    date: date,
//    event: "New Task Created",
//    comment: ( task_id + " | " + _i_id_new_task_name + " | " + _i_id_new_task_desc )
//  };
//  events.push( _event );
  events = G_ADD_JOURNAL_EVENT(events, date, "New Task Created", ( task_id + " | " + _i_id_new_task_name + " | " + _i_id_new_task_desc ), __sender );
  sheet.appendRow( 
    [
      task_id,
      date, 
      _i_id_new_task_name, 
      _i_id_new_task_desc,
      i_id_new_task_responcer_id, 
      JSON.stringify([i_id_new_task_controller_id]), 
      i_id_new_task_project_id,
      i_id_new_task_creator_id,
      task_dedline,
      control_deadline,
      JSON.stringify( events ),
      "last_cell"
    ] 
  );
  return G_UpdateTasksList( _fileId );
}

// -----------------------------------------------------------------------------
// GET TASKS LIST
// -----------------------------------------------------------------------------
function G_UpdateTasksList( _fileId ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "active" );
  var tasks = sheet.getDataRange().getValues();
  return [101, "Return From GAS = G_UpdateTasksList( _fileId )", JSON.stringify(tasks)];
}
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
// -----------------------------------------------------------------------------
// ADD JOURNAL EVENT -- COMMENT
// -----------------------------------------------------------------------------
function G_Add_Note_To_Task( _fileId, _listid, _taskid, _note, _sender ){
  Logger.log( "G_Add_Note_To_Task( _fileId, _massive, _note, _sender )" );
  var sheet = F_Get_Sheet_By_Name( _fileId, "active" );
  var data = sheet.getDataRange().getValues();
  return G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, new Date(), "Adding note", _note, _sender );
}
// -----------------------------------------------------------------------------
// ADD JOURNAL EVENT AND SAVE
// -----------------------------------------------------------------------------
function G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, __date, __event, __comment, __sender, __stage ){
  var stage = "active";
  if( __stage != null ){
    stage = __stage;
  }
  var sheet = F_Get_Sheet_By_Name( _fileId, stage );
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
// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_FROM_ACTIVE_TO_CONTROL(_fileId, _taskid, __sender ){
  // add control for sender
  Logger.log( "G_MOVE_FROM_ACTIVE_TO_CONTROL" )
    
  var sheet_active = F_Get_Sheet_By_Name( _fileId, "active" );
  var sheet_control = F_Get_Sheet_By_Name( _fileId, "control" );
//  var sheet_active = SpreadsheetApp.getActiveSheet();
  var data_active = sheet_active.getDataRange().getValues();

//  var data_control = sheet.getDataRange().getValues();
//  Logger.log(  )
  for( var ira=0; ira<data_active.length; ira++ ){
    Logger.log( "Comp = " + data_active[ira][0] + "  == " + _taskid )
    if(data_active[ira][0] == _taskid ){
      sheet_control.appendRow( data_active[ira] );
      sheet_active.deleteRow(ira+1);
      var date = new Date(),
          event = "MovedToControl",
          comment = "Task was moved to control",
          stage = "control";
      G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    }
  }
  
}

// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_FROM_CONTROL_TO_FULFILLED(_fileId, _taskid, __sender ){
  // add control for sender
  Logger.log( "G_MOVE_FROM_CONTROL_TO_FULFILLED" )
    
  var sheet_control = F_Get_Sheet_By_Name( _fileId, "control" );
  var sheet_fulfilled = F_Get_Sheet_By_Name( _fileId, "fulfilled" );
  //  var sheet_active = SpreadsheetApp.getActiveSheet();
  var data_control = sheet_control.getDataRange().getValues();

//  var data_control = sheet.getDataRange().getValues();
//  Logger.log(  )
  for( var ira=0; ira<data_control.length; ira++ ){
    Logger.log( "Comp = " + data_control[ira][0] + "  == " + _taskid )
    if(data_control[ira][0] == _taskid ){
      sheet_fulfilled.appendRow( data_control[ira] );
      sheet_control.deleteRow(ira+1);
      var date = new Date(),
          event = "MovedToFulfilled",
          comment = "Task was moved to fulfilled",
          stage = "fulfilled";
      G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    }
  }
  
}
// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_TO_ARCHIVED(_fileId, _taskid, __sender, __fromStage ){
  // add control for sender
  Logger.log( "G_MOVE_FROM_FULFILLED_TO_ARCHIVED" )
  var fromStage = "fulfilled";
  if( __fromStage != null){
    fromStage = __fromStage;
  }
  var sheet_fulfilled = F_Get_Sheet_By_Name( _fileId, "fulfilled" );
  var sheet_archived = F_Get_Sheet_By_Name( _fileId, "archived" );
  //  var sheet_active = SpreadsheetApp.getActiveSheet();
  var data_fulfilled = sheet_fulfilled.getDataRange().getValues();

//  var data_control = sheet.getDataRange().getValues();
//  Logger.log(  )
  for( var ira=0; ira<data_fulfilled.length; ira++ ){
    Logger.log( "Comp = " + data_fulfilled[ira][0] + "  == " + _taskid )
    if(data_fulfilled[ira][0] == _taskid ){
      sheet_archived.appendRow( data_fulfilled[ira] );
      sheet_fulfilled.deleteRow(ira+1);
      var date = new Date(),
          event = "Archivation",
          comment = "Task was archived",
          stage = "archived";
      G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    }
  }
  
}

function test_in_do_get(){
 G_MOVE_TO_ARCHIVED("1HzUAzNaAEp0nvMOLS9D_KBJPxhvRZseLmZlK9bD6e34", "0.e6ajr1k0liv", "" )
   
}