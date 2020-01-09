var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
// DataBase 
var mysql = require("mysql");

const mysqlx = require('@mysql/xdevapi');
const client = mysqlx.getClient({
    user: 'root',
    host: 'localhost',
    port: 33060,
    password: 'MyNewPass',
    schema: 'staff_assignment'
});

//Client CRUD Start
function insertClient(obj) {
    client.getSession().then(session => {
        session.sql("INSERT INTO client (`name`,`id_card`,`telephone`,`address`,`age`,`profession`,`date`,`picture`,`status`) VALUES (?,?,?,?,?,?,?,?,?)").bind([obj.name, obj.id_card, obj.telephone, obj.address, obj.age, obj.profession, obj.date, obj.picture, obj.status]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function RetrieveClient(obj, fn) {
    client.getSession().then(session => {
        session.sql("SELECT*FROM `client`WHERE  `id_card` = ? ORDER BY `id_card` ASC").bind([obj.id_card]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function UpdateClient(obj, fn) {
    client.getSession().then(session => {
        session.sql("UPDATE `client` SET `name` = ?, `telephone` = ?, `address` = ?, `age` = ?, `profession` = ?, `date` = ?, `picture` = ?, `status` = ? WHERE `id_card` = ?").bind([obj.name, obj.telephone, obj.address, obj.age, obj.profession, obj.date, obj.picture, obj.status, obj.id_card]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function DeleteClient(obj) {
    client.getSession().then(session => {
        session.sql("DELETE FROM client WHERE `id_card` = ?").bind([obj.id_card]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}
/*
insertClient({
    name: '呂海東',
    id_card: 'A987654326',
    telephone: '02-2222-3333',
    address: '台北市文湖路三段一八一號',
    age: '38',
    profession: '大學教授',
    date: '2010/11/05',
    status: '正常'
});
*/
//Client CRUD END


//使用ejs渲染
app.get('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    // res.send('<html><head></head><body><h1>沒用ejs的寫法</h1></body></html>');

    //呈現client畫面 
    res.render('client', {
        'client': [],
        'update': false
    });
    /*
        res.render('order_record', {
            'order_record': [],

        });
    */
})

app.get('/order_record', function (req, res) {

    res.render('order_record', {
        'order_record': [],
        'update': false
    });
});

//增加靜態檔案的路徑
app.use(express.static('public'))

//增加body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))


//設定路由(router)
app.get('/user', function (req, res) {
    res.send('<html><head></head><body><h1>消止豬</h1></body></html>');
})
app.get('/order_record', function (req, res) {
    console.log(req.body);
})
//post當使用者傳送資料到後端
app.post('/addClient', function (req, res) {
    console.log(req.body);
    if (req.body.update == "true") {
        UpdateClient(req.body, function () {
            RetrieveClient(req.body, function (result) {
                res.render('client', {
                    'client': result,
                    'update': false
                });
            });
        });
    } else {
        insertClient(req.body);
        //轉址回到search，若用render網址會變成searchList(由路由決定的)
        res.redirect('/');
    }

})
app.post('/searchClient', function (req, res) {
    RetrieveClient(req.body, function (result) {
        res.render('client', {
            'client': result,
            'update': false
        });
    });

})

app.post('/updateClient', function (req, res) {
    console.log(req.body);
    RetrieveClient(req.body, function (result) {
        res.render('client', {
            'client': result,
            'update': true
        });
    });
})

app.post('/deleteClient', function (req, res) {
    console.log(req.body);
    DeleteClient(req.body);
    res.redirect('/');

})

//監聽port
//process.env雲端主機上的port
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);