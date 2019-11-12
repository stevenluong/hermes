var express = require('express')
var multer  = require('multer')
var cors = require('cors')
var upload = multer({ dest: 'uploads/' })

var app = express();
app.use(cors());

app.post('/uploads', upload.single('screen'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
    //res.end("test");
    res.send(req.file);
    //res.send(JSON.stringify(req.file));
})
app.get('/test', (req,res,next)=>{
    res.send("test");
})
app.use(express.static(__dirname+''))

app.listen(8088);
