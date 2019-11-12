var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

app.post('/uploads', upload.single('screen'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
    res.send(req.path);
})

app.listen(8088);
