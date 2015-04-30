
require( 'babel/register' )

var glob = require( 'glob' )


glob( __dirname + '/**/*.js', function( err, files ) {
    if ( err ) {
        console.error( 'Error globbing for files' )
        throw new Error( err )
    }

    files
        .filter( function( file ) {
            return !/index/.test( file )
        })
        .forEach( function( file ) {
            require( file )
        })
})
