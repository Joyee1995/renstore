const mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'renstore'
});

db.on('error',function(ex){
    console.log('ex:',ex)
})

db.connect();

module.exports = db;