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
        //讓傳進來的DATA符合一般日期:DATE_FORMAT(`order_date`, '%Y-%m-%d')
        session.sql("SELECT*,DATE_FORMAT(`date`, '%Y-%m-%d') AS `formated_date` FROM `client`WHERE  `id_card` = ? ORDER BY `id_card` ASC").bind([obj.id_card]).execute().then(function (result) {
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
        session.sql("UPDATE `client` SET `status` = '停用'  WHERE `id_card` = ?").bind([obj.id_card]).execute().then(function (result) {
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

//Order Record CRUD Start
function insertOrderRecord(obj) {
    client.getSession().then(session => {
        session.sql("INSERT INTO order_record (`id_card`,`order_date`,`expected_delivery_date`,`actual_delivery_date`,`product_name`,`unit`,`amount`,`price`,`order_price`,`supplier`,`suppler_number`) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind([obj.id_card, obj.order_date, obj.expected_delivery_date, obj.actual_delivery_date, obj.product_name, obj.unit, obj.amount, obj.price, obj.order_price, obj.supplier, obj.suppler_number]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function RetrieveOrderRecord(obj, fn) {
    client.getSession().then(session => {
        session.sql("SELECT*,DATE_FORMAT(`order_date`, '%Y-%m-%d'),DATE_FORMAT(`expected_delivery_date`, '%Y-%m-%d') ,DATE_FORMAT(`actual_delivery_date`, '%Y-%m-%d') FROM `order_record` WHERE `id_card` = ? ORDER BY `id_card` ASC").bind([obj.id_card]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function UpdateOrderRecord(obj, fn) {
    client.getSession().then(session => {
        session.sql("UPDATE `order_record` SET `order_date`=?,`expected_delivery_date`=?,`actual_delivery_date`=?,`product_name`=?,`unit`=?,`amount`=?,`price`=?,`order_price`=?,`supplier`=?,`suppler_number`=? WHERE `id_card` =?").bind([obj.order_date, obj.expected_delivery_date, obj.actual_delivery_date, obj.product_name, obj.unit, obj.amount, obj.price, obj.order_price, obj.supplier, obj.suppler_number, obj.id_card]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function DeleteOrderRecord(obj) {
    client.getSession().then(session => {
        session.sql("DELETE FROM order_record WHERE `id_card` = ?").bind([obj.id_card]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}
//Order Record CRUD END

//Company Purchase CRUD Start
function insertCompanyPurchase(obj) {
    client.getSession().then(session => {
        session.sql("INSERT INTO company_purchase (`supplier`,`supplier_number`,`supplier_principal`,`purchase`,`purchase_account`,`purchase_unit`,`purchase_price`,`subtotal`,`inventory_positions`,`specification`,`order_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind([obj.supplier, obj.supplier_number, obj.supplier_principal, obj.purchase, obj.purchase_account, obj.purchase_unit, obj.purchase_price, obj.subtotal, obj.inventory_positions, obj.specification, obj.order_date]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function RetrieveCompanyPurchase(obj, fn) {
    client.getSession().then(session => {
        session.sql("SELECT*,DATE_FORMAT(`order_date`, '%Y-%m-%d')FROM `company_purchase` WHERE `supplier_number` = ? ORDER BY `supplier_number` ASC").bind([obj.supplier_number]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function UpdateCompanyPurchase(obj, fn) {
    client.getSession().then(session => {
        session.sql("UPDATE `company_purchase` SET `supplier`=?,`supplier_principal`=?,`purchase`=?,`purchase_account`=?,`purchase_unit`=?,`purchase_price`=?,`subtotal`=?,`inventory_positions`=?,`specification`=?,`order_date`=? WHERE `supplier_number` =?").bind([obj.supplier, obj.supplier_principal, obj.purchase, obj.purchase_account, obj.purchase_unit, obj.purchase_price, obj.subtotal, obj.inventory_positions, obj.specification, obj.order_date, obj.supplier_number]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function DeleteCompanyPurchase(obj) {
    client.getSession().then(session => {
        session.sql("DELETE FROM company_purchase WHERE `supplier_number` = ?").bind([obj.supplier_number]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}
//Company Purchase CRUD END

//Company Account CRUD Start
function insertCompanyAccount(obj) {
    client.getSession().then(session => {
        session.sql("INSERT INTO company_account (`client_name`,`client_id`,`receivable_account`,`receivable_date`,`unreceivable_account`) VALUES (?,?,?,?,?)").bind([obj.client_name, obj.client_id, obj.receivable_account, obj.receivable_date, obj.unreceivable_account]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function RetrieveCompanyAccount(obj, fn) {
    client.getSession().then(session => {
        session.sql("SELECT*,DATE_FORMAT(`receivable_date`, '%Y-%m-%d')FROM `company_account` WHERE `client_id` = ? ORDER BY `client_id` ASC").bind([obj.client_id]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function UpdateCompanyAccount(obj, fn) {
    client.getSession().then(session => {
        session.sql("UPDATE `company_account` SET `client_name`=?,`receivable_account`=?,`receivable_date`=?,`unreceivable_account`=? WHERE `client_id`=?").bind([obj.client_name, obj.receivable_account, obj.receivable_date, obj.unreceivable_account, obj.client_id]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function DeleteCompanyAccount(obj) {
    client.getSession().then(session => {
        session.sql("DELETE FROM company_account WHERE`client_id`=?").bind([obj.client_id]).execute().then(function (result) {
            console.log(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}
//Order Record CRUD END

//User Client

function RetrieveUserClient(obj, fn) {
    client.getSession().then(session => {
        //讓傳進來的DATA符合一般日期:DATE_FORMAT(`order_date`, '%Y-%m-%d')
        session.sql("SELECT*,DATE_FORMAT(`date`, '%Y-%m-%d') AS `formated_date` FROM `client`WHERE  `id_card` = ? ORDER BY `id_card` ASC").bind([obj.id_card]).execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function RetriveAllClient(fn) {
    client.getSession().then(session => {
        //讓傳進來的DATA符合一般日期:DATE_FORMAT(`order_date`, '%Y-%m-%d')
        session.sql("SELECT*,DATE_FORMAT(`date`, '%Y-%m-%d') AS `formated_date` FROM `client`").execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}

function CountClientStatus(fn) {
    client.getSession().then(session => {
        //讓傳進來的DATA符合一般日期:DATE_FORMAT(`order_date`, '%Y-%m-%d')
        session.sql("SELECT COUNT(*) FROM `client` Group by `status` order by `status` DESC;").execute().then(function (result) {
            fn(result.fetchAll());
        }).catch(console.error);
        return session.close();
    }).catch(console.error);
}


//User Client END
//使用ejs渲染
app.get('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//連結ejs  /後面放路由名稱
app.get('/', function (req, res) {
    // res.send('<html><head></head><body><h1>沒用ejs的寫法</h1></body></html>');

    //呈現client畫面 
    res.render('client', {
        'client': [],
        'update': false
    });
});

app.get('/orderRecord', function (req, res) {

    res.render('order_record', {
        'order_record': [],
        'update': false
    });
});

app.get('/companyPurchase', function (req, res) {

    res.render('company_purchase', {
        'company_purchase': [],
        'update': false
    });
});

app.get('/companyAccount', function (req, res) {

    res.render('company_account', {
        'company_account': [],
        'update': false
    });
});

app.get('/userClient', function (req, res) {

    res.render('user_client', {
        'user_client_search': [],
        'user_client_data': [],
        'user_client_status': [],
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
/*
範例
app.get('/user', function (req, res) {
    res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');
})
*/
//post當使用者傳送資料到後端

//Client
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
    RetrieveClient(req.body, function (result) {
        res.render('client', {
            'client': result,
            'update': false
        });
    });


})

//Order Record
app.post('/addOrderRecord', function (req, res) {
    console.log(req.body);
    if (req.body.update == "true") {
        UpdateOrderRecord(req.body, function () {
            RetrieveOrderRecord(req.body, function (result) {
                res.render('order_record', {
                    'order_record': result,
                    'update': false
                });
            });
        });
    } else {
        insertOrderRecord(req.body);
        //轉址回到search，若用render網址會變成searchList(由路由決定的)
        res.redirect('/orderRecord');
    }

})
app.post('/searchOrderRecord', function (req, res) {
    console.log(req.body);
    RetrieveOrderRecord(req.body, function (result) {
        res.render('order_record', {
            'order_record': result,
            'update': false
        });
    });

})

app.post('/updateOrderRecord', function (req, res) {
    console.log(req.body);
    RetrieveOrderRecord(req.body, function (result) {
        res.render('order_record', {
            'order_record': result,
            'update': true
        });
    });
})

app.post('/deleteOrderRecord', function (req, res) {
    console.log(req.body);
    DeleteOrderRecord(req.body);
    res.redirect('/orderRecord');

})


//Company Purchase
app.post('/addCompanyPurchase', function (req, res) {
    console.log(req.body);
    if (req.body.update == "true") {
        UpdateCompanyPurchase(req.body, function () {
            RetrieveCompanyPurchase(req.body, function (result) {
                res.render('company_purchase', {
                    'company_purchase': result,
                    'update': false
                });
            });
        });
    } else {
        insertCompanyPurchase(req.body);
        //轉址回到search，若用render網址會變成searchList(由路由決定的)
        res.redirect('/companyPurchase');
    }

})
app.post('/searchCompanyPurchase', function (req, res) {
    console.log(req.body);
    RetrieveCompanyPurchase(req.body, function (result) {
        res.render('company_purchase', {
            'company_purchase': result,
            'update': false
        });
    });

})

app.post('/updateCompanyPurchase', function (req, res) {
    console.log(req.body);
    RetrieveCompanyPurchase(req.body, function (result) {
        res.render('company_purchase', {
            'company_purchase': result,
            'update': true
        });
    });
})

app.post('/deleteCompanyPurchase', function (req, res) {
    console.log(req.body);
    DeleteCompanyPurchase(req.body);
    res.redirect('/companyPurchase');

})

//Company Account
app.post('/addCompanyAccount', function (req, res) {
    console.log(req.body);
    if (req.body.update == "true") {
        UpdateCompanyAccount(req.body, function () {
            RetrieveCompanyAccount(req.body, function (result) {
                res.render('company_account', {
                    'company_account': result,
                    'update': false
                });
            });
        });
    } else {
        insertCompanyAccount(req.body);
        //轉址回到search，若用render網址會變成searchList(由路由決定的)
        res.redirect('/companyAccount');
    }

})
app.post('/searchCompanyAccount', function (req, res) {
    console.log(req.body);
    RetrieveCompanyAccount(req.body, function (result) {
        res.render('company_account', {
            'company_account': result,
            'update': false
        });
    });

})

app.post('/updateCompanyAccount', function (req, res) {
    console.log(req.body);
    RetrieveCompanyAccount(req.body, function (result) {
        res.render('company_account', {
            'company_account': result,
            'update': true
        });
    });
})

app.post('/deleteCompanyAccount', function (req, res) {
    console.log(req.body);
    DeleteCompanyAccount(req.body);
    res.redirect('/companyAccount');

})


//User Client
app.post('/resultUserClient', function (req, res) {
    RetrieveUserClient(req.body, function (search_result) {
        RetriveAllClient(function (all_result) {
            CountClientStatus(function (status_count) {
                res.render('user_client', {
                    'user_client_search': search_result,
                    'user_client_data': all_result,
                    'user_client_status': status_count,
                    'update': false
                });
            });
        })
    });
});
//監聽port
//process.env雲端主機上的port
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);