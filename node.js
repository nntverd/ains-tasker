function func1(){

    console.log( "func1 - exec 1 " );
    throw( "error" );
    console.log( "func1 - exec 2 " );
    
}

function func2(){
    try{
        console.log( "func2 - exec 1 " );
        func1();
        console.log( "func2 - exec 2 " );
        
    }catch( msg ){

        console.log( "catch 2 ", msg )
        throw(msg );
    }
    
}

function func3(){
    try{
        console.log( "func3 - exec 1 " );
        func2();
        console.log( "func3 - exec 2 " );
        
    }catch( msg ){

        console.log( "catch 3", msg )
    }
    
}

func3();