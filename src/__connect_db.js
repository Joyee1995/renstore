const mysql = require('mysql');
const bluebird = require('bluebird')
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
bluebird.promisifyAll(db);

module.exports = db;