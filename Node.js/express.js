var express = require('express');
var app = express();
var fs = require('fs');
app.get('/listele', function (req, res) {
    //res.send('kullanıcıları listeleyen çağrı');
    fs.readFile('kullanici.json', 'utf-8', function (err, data) {
        console.log(data);
        res.end(data)
    });
});
app.get('/ekle', function (req, res) {
    //res.end('kullanıcıları ekleyen çağrı');
    var yeniKullanici = {
        "k3": {
            "isim": req.query.isim,
            "sifre": req.query.sifre,
            "email": req.query.email
        }
    };
    fs.readFile('kullanici.json', 'utf-8', function (err, data) {
        data = JSON.parse(data)
        //data bir nesne olduğundan erişilemiyordu bu yüzden json dizisi haline dönüştürmek için pars edilir. 
        data["k3"] = yeniKullanici["k3"];
        console.log(data);
        fs.writeFile('kullanici.json', JSON.stringify(data), function (err) {
            console.log('bir hata oluştu');
        });
        //http sunucusunda görülebilmesi için string ifadeye dönüşmeli
        res.end(JSON.stringify(data));
    });
});
app.get('/sil', function (req, res) {
    fs.readFile('kullanici.json', 'utf-8', function (err, data) {
        //res.end('kullanıcıları silen çağrı');
        data = JSON.parse(data)
        var id = "k" + req.query.id;
        delete data[id];
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile('kullanici.json', JSON.stringify(data), function (err) {
            console.log('bir hata oluştu');
        });
    });
});
app.get('/sorgula', function (req, res) {
    fs.readFile('kullanici.json', 'utf-8', function (err, data) {
        //res.end('kullanıcıları silen çağrı');
        data = JSON.parse(data)
        var id = "k" + req.query.id;
        console.log(data[id]);
        res.end(JSON.stringify(data[id]));
    });
});
var server = app.listen(8000, function () {
    console.log('sunucu çalışıyor');
});

