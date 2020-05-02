var express = require('express')
var app = express();
// const db =require(__dirname + '/__connect_db');
app.use(express.static('public'));
console.log(__dirname)
app.set('view engine','ejs')
// app.use('/ren',require(__dirname+'/script').router)

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/renstore', (req, res)=>{
    res.render('main_profile');
});

app.get('/renstore/beauty', (req, res)=>{
    res.render('beauty');
});

app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404-找不到網頁');
})

app.listen(5000,function(){
    console.log('start server 5000');
});