// ===============================================================================================
// recieve user list of company
// ===============================================================================================
function G_Update_Users_List( _fileId ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "users" );
  var users = sheet.getDataRange().getValues();
  return JSON.stringify(users);
}
// ===============================================================================================
// Adding new user to company
// ===============================================================================================
function G_Add_New_User( _fileId, i_id_new_user_name, i_id_new_user_email, i_id_new_user_passw ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "users" );
  var users = sheet.getDataRange().getValues();
  if( i_id_new_user_email.trim() == "" ){
    i_id_new_user_email = Math.random().toString(36).substring(9) + "@temporal_ains.kz";
  }
  for( var i in users ){
    Logger.log( users[i][1] + "         " + i_id_new_user_email )
    if( users[i][1] == i_id_new_user_email ){
      return "User with this email already exist";
    }
  }
  var user_id = "" + Math.random().toString(36).substring(3);
  sheet.appendRow( [i_id_new_user_name, i_id_new_user_email, i_id_new_user_passw, user_id] );
  return "User has been created";
  
}

function G_Usr_Login( _fileId, i_id_usr_lgn, i_id_usr_pwd ){
  var sheet = F_Get_Sheet_By_Name( _fileId, "users" );
  var users = sheet.getDataRange().getValues();
  for( var i in users ){
//    Logger.log( users[i][1] + "         " + i_id_new_user_email )
    if( users[i][1] == i_id_usr_lgn || users[i][0] == i_id_usr_lgn || users[i][3] == i_id_usr_lgn ){
      if( users[i][2] == i_id_usr_pwd ){
        return [700, "Return from GAS = G_Usr_Login = Logged in successfully", JSON.stringify([users[i][0], users[i][3]])];
      }
      return [701, "Return from GAS = G_Usr_Login = Password is incorrect"];
    }
  }
  
  
  return [701, "Return from GAS = G_Usr_Login = User Name, email or id is incorrect"];
}