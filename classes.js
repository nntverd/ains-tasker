var addr = {
    id:   0,   name: 1,
    desc: 2,   crtr: 3,
    cntr: 4,   resp: 5 
};
class Task{
    // ----------------------------------------------------------
    constructor( _name, _creator ){
        this.id =  Math.random().toString(36).substring(9);
        this.name = _name;
        this.creator = _creator;
        this.controller = _creator;

        var date = new Date();
        this.dateOfCreation = date.toISOString().substring(0, 10);
    }
    // ----------------------------------------------------------
    setDescription(  _desc ){
        this.description = _desc;
    }

    // ----------------------------------------------------------
    saveToTable( __tableId, __sheetName ){
        var sheet = F_Get_Sheet_By_Name( __tableId, sheetName );
        var datarange = sheet.getDataRange();
        var data = datarange.getValues();
        
        for( var i=0; i<data.length;i++ ){
            if( data[i][addr.id] == this.id ){
                data[i] = prepareRowForTable();
                return 1;
            }
        }
        throw( "Task id is not found in the list " + sheetName );
    }
    // ----------------------------------------------------------
    prepareRowForTable(){
        var row = [];
        
        row[addr.id] = this.id;
        row[addr.name] = this.name;

        return row;
    }
}

function classtest(){
    var task = new Task( "task 1", "nikolay" )
    Logger.log( task )
}