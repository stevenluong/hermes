var Tesseract = require('tesseract.js')
var express = require('express')
var path = require('path');
var request = require('request')
var multer  = require('multer')
var cors = require('cors')
var upload = multer({ dest: 'uploads/' })

var app = express();
app.use(cors());

app.post('/uploads', upload.single('screen'), function (req, res1, next) {
    console.log(req.file);
    console.log(req.body);
    //res.end("test");
    var filepath = req.file.path;
    request.post("http://slapps.fr:3001/api/receipts",{form:{
        "location": req.body.location,
        "date": req.body.date,
        "path": filepath,
        "comment": req.body.comment
    },json:true},(err,res,body)=>{
        if (err) { return console.log(err); }
        //console.log(res)
        console.log(body);
        res1.send(body);
        var receiptId = body.id;
        //TODO placeholder analysis 
        request.post("http://slapps.fr:3001/api/analyses",{form:{
            "status": "NEW",
            "receiptId": receiptId,
        },json:true},(err,res,body)=>{
            if (err) { return console.log(err); }
            console.log(body);
            var analysisId = body.id;
            //TODO trigger analysis 
            tess(analysisId, filepath);
        }) 
    })
    //res.send(JSON.stringify(req.file));
})
app.get('/test', (req,res,next)=>{
    res.send("test");
})
app.use(express.static(__dirname+''))

app.listen(8088);

var tess = function(id,filepath){
    const image = path.resolve(__dirname, filepath);
    Tesseract.recognize(image, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            console.log(text);
            request.patch("http://slapps.fr:3001/api/analyses/"+id,{form:{
                "status": "DONE",
                "output": text
            },json:true},(err,res,body)=>{
                if (err) { return console.log(err); }
                console.log(body);
            })
        });
}

