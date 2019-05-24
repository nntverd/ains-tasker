// *************************************************************************
// Moves task on stage
// **************************************************************************
function G_MOVE_TASK(_fileId, _taskid, __sender, __oldStage, __newStage) {
    // add control for sender
    Logger.log("G_MOVE_TASK")
    var oldStage = "active",
        newStage = "control";

    if (__oldStage != null) {
        oldStage = __oldStage;
    }
    if (__newStage != null) {
        newStage = __newStage;
    }
    var sheet_active = F_Get_Sheet_By_Name(_fileId, oldStage);
    var sheet_control = F_Get_Sheet_By_Name(_fileId, newStage);
    var data_active = sheet_active.getDataRange().getValues();

    for (var ira = 0; ira < data_active.length; ira++) {
        Logger.log("Comp = " + data_active[ira][0] + "  == " + _taskid)
        if (data_active[ira][0] == _taskid) {
            sheet_control.appendRow(data_active[ira]);
            sheet_active.deleteRow(ira + 1);
            var date = new Date(),
                event = "MovedTask",
            var sheet_active = F_Get_Sheet_By_Name(_fileId, oldStage),
                comment = "Task was moved from " + oldStage + " to " + newStage,
                stage = "control";
            G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage);
        }
    }

}

// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_FROM_ACTIVE_TO_CONTROL(_fileId, _taskid, __sender) {
    // add control for sender
    Logger.log("G_MOVE_FROM_ACTIVE_TO_CONTROL")
    G_MOVE_TASK(_fileId, _taskid, __sender, "active", "control");
    //     var sheet_active = F_Get_Sheet_By_Name( _fileId, "active" );
    //     var sheet_control = F_Get_Sheet_By_Name( _fileId, "control" );
    //   //  var sheet_active = SpreadsheetApp.getActiveSheet();
    //     var data_active = sheet_active.getDataRange().getValues();

    //   //  var data_control = sheet.getDataRange().getValues();
    //   //  Logger.log(  )
    //     for( var ira=0; ira<data_active.length; ira++ ){
    //       Logger.log( "Comp = " + data_active[ira][0] + "  == " + _taskid )
    //       if(data_active[ira][0] == _taskid ){
    //         sheet_control.appendRow( data_active[ira] );
    //         sheet_active.deleteRow(ira+1);
    //         var date = new Date(),
    //             event = "MovedToControl",
    //             comment = "Task was moved to control",
    //             stage = "control";
    //         G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    //       }
    //     }

}

// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_FROM_CONTROL_TO_FULFILLED(_fileId, _taskid, __sender) {
    // add control for sender
    Logger.log("G_MOVE_FROM_CONTROL_TO_FULFILLED")
    G_MOVE_TASK(_fileId, _taskid, __sender, "control", "fulfilled");
    //     var sheet_control = F_Get_Sheet_By_Name( _fileId, "control" );
    //     var sheet_fulfilled = F_Get_Sheet_By_Name( _fileId, "fulfilled" );
    //     //  var sheet_active = SpreadsheetApp.getActiveSheet();
    //     var data_control = sheet_control.getDataRange().getValues();

    //   //  var data_control = sheet.getDataRange().getValues();
    //   //  Logger.log(  )
    //     for( var ira=0; ira<data_control.length; ira++ ){
    //       Logger.log( "Comp = " + data_control[ira][0] + "  == " + _taskid )
    //       if(data_control[ira][0] == _taskid ){
    //         sheet_fulfilled.appendRow( data_control[ira] );
    //         sheet_control.deleteRow(ira+1);
    //         var date = new Date(),
    //             event = "MovedToFulfilled",
    //             comment = "Task was moved to fulfilled",
    //             stage = "fulfilled";
    //         G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    //       }
    //     }

}
// *************************************************************************
// Moves active task on stage of control
// **************************************************************************
function G_MOVE_TO_ARCHIVED(_fileId, _taskid, __sender, __fromStage) {
    // add control for sender
    Logger.log("G_MOVE_FROM_FULFILLED_TO_ARCHIVED")
    var fromStage = "fulfilled";
    if (__fromStage != null) {
        fromStage = __fromStage;
    }
    G_MOVE_TASK(_fileId, _taskid, __sender, fromStage, "archived");
    //     var sheet_fulfilled = F_Get_Sheet_By_Name( _fileId, "fulfilled" );
    //     var sheet_archived = F_Get_Sheet_By_Name( _fileId, "archived" );
    //     //  var sheet_active = SpreadsheetApp.getActiveSheet();
    //     var data_fulfilled = sheet_fulfilled.getDataRange().getValues();

    //   //  var data_control = sheet.getDataRange().getValues();
    //   //  Logger.log(  )
    //     for( var ira=0; ira<data_fulfilled.length; ira++ ){
    //       Logger.log( "Comp = " + data_fulfilled[ira][0] + "  == " + _taskid )
    //       if(data_fulfilled[ira][0] == _taskid ){
    //         sheet_archived.appendRow( data_fulfilled[ira] );
    //         sheet_fulfilled.deleteRow(ira+1);
    //         var date = new Date(),
    //             event = "Archivation",
    //             comment = "Task was archived",
    //             stage = "archived";
    //         G_ADD_JOURNAL_EVENT_AND_SAVE(_fileId, _taskid, date, event, comment, __sender, stage );
    //       }
    //     }

}