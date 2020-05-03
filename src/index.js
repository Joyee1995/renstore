var express = require('express')
var app = express();
const db = require(__dirname + '/__connect_db');
app.use(express.static('public'));
console.log(__dirname)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extened: false }));
const port = process.env.PORT || 3000
const session = require('express-session');

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'Imjoyee2391',
    cookie: {
        maxAge: 1200000,
    }
}));
// app.use('/ren',require(__dirname+'/script').router)

app.use((req,res,next)=>{
    res.locals.isAdmin = false;
    if(req.session.admin&& req.session.admin.account){
        res.locals.admin = req.session.admin
        res.locals.isAdmin = true
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/renstore', (req, res) => {
    res.render('main_profile');
});

app.get('/renstore/beauty', (req, res) => {
    res.render('beauty');
});

app.get('/renstore/login', (req, res) => {
    res.render('login');
})

app.post('/renstore/login', (req, res) => {
    const sql = "SELECT `id`, `Name`, `account` FROM `renstore` WHERE `account`=? AND `password` =?"
    // console.log(req.body)
    db.query(sql, [req.body.account, req.body.password], (error, results) => {
        if (error)
            res.json({
                success: false
            })
        if (results && results.length == 1) {
            req.session.admin = results[0];
            res.json({
                success: true,
                admin: results[0]
            })
        } else res.json({ success: false })
    })

})

app.get('/renstore/logout', (req, res) => {
    delete req.session.admin;
    res.redirect('login');
})

app.get('/renstore/signup', (req, res) => {
    res.render('add');
})

app.get('/renstore/cart', (req, res) => {
    res.render('cart');
})

app.post('/renstore/add', (req, res) => {


    const output = {
        success: true,
        postData: req.body,
    };


    const sql = "INSERT INTO `renstore`(`Name`,`account`,`mobile`,`birthday`, `address`,`password`,`created_at`)VALUES" +
        "(?,?,?,?,?,?,NOW())";
        console.log(req.body)
    db.query(sql, [
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.birthday,
        req.body.address,
        req.body.password
    ], (error, results) => {
        if (error) {
            console.log(error);
            output.success = false
            output.error = error
        } else {

            output.results = results
        }
        res.json(output)
    })
})




app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404-找不到網頁');
})

app.listen(port, function () {
    console.log('start server' + port);
})