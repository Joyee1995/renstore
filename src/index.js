var express = require('express')
var app = express();
const db =require(__dirname + '/__connect_db');
app.use(express.static('public'));
console.log(__dirname)
app.set('view engine','ejs')
// app.use('/ren',require(__dirname+'/script').router)

// app.use((req,res,next)=>{
//     res.locals.pageName = '';
//     res.locals.isAdmin = false;
//     if(req.session.admin&& req.session.admin.account){
//         res.locals.admin = req.session.admin
//         res.locals.isAdmin = true
//     }
//     next();
// })

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/renstore', (req, res)=>{
    res.render('main_profile');
});

app.get('/renstore/beauty', (req, res)=>{
    res.render('beauty');
});

app.get('/renstore/login', (req, res) => {
    res.render('login');
})

app.post('/renstore/login', (req, res) => {
    const sql = "SELECT `id`, `Name`, `E-mail`, `password`, `created_at` FROM `renstore` WHERE `E-mail`=? AND `password` =?"
    db.queryAsync(sql, [req.body.account, req.body.password])
        .then(results => {
            console.log(results)
            if (results && results.length === 1) {
                req.session.admin = results[0];
                res.json({
                    success: true,
                    admin: results[0]
                })

            } else {
                res.json({ success: false });
            }
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            })

        })
    })

app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404-找不到網頁');
})

app.listen(5000,function(){
    console.log('start server 5000');
})