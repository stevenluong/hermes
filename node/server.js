const { createWorker, createScheduler } = require('tesseract.js');

var express = require('express');
var path = require('path');
//var request = require('request');
const fetch = require('node-fetch')
var multer  = require('multer');
var cors = require('cors');
var moment = require('moment');
var upload = multer({ dest: 'uploads/' });

var app = express();
app.use(cors());
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}

const scheduler = createScheduler();
const worker1 = createWorker({
  logger: m=>console.log(m)
});
//const worker2 = createWorker();

(async () => {
await worker1.load();
//await worker2.load();
await worker1.loadLanguage('eng');
await worker1.initialize('eng');
//await worker2.loadLanguage('eng');
//await worker1.initialize('eng');
//await worker2.initialize('eng');
scheduler.addWorker(worker1);
//scheduler.addWorker(worker2);
})();

var url = "https://athena.slapps.fr/_db/production/hermes/receipts/";

app.post('/uploads', upload.single('file'), function (req, res1, next) {
    console.log(req.file);
    console.log(req.body);
    //res.end("test");
    var filepath = req.file.path;
    var date = moment().format('DD/MM/YYYY');;

    const body = {
      date: date,
      path: filepath,
      user: req.body.user,
      status: "NEW"
    };
    console.log(body);
    fetch(url, {
    	method: 'post',
    	body: JSON.stringify(body),
    	headers: {'Content-Type': 'application/json'}
    })
    	.then(res => res.json())
    	.then(json => {

        console.log(json)
        res1.send(json);
        var receiptId = json._key;
        tess(receiptId, filepath, req.body.user);
        //res1.end();
      });
})
app.use(express.static(__dirname+''))

app.listen(8088);

var tess = function(key,filepath,user){
    const image = path.resolve(__dirname, filepath);
    var date = moment().format('DD/MM/YYYY');
    (async () => {
    //const { data: { text } } = await worker1.recognize(image);
    //const text = scheduler.addJob('recognize',image)
    const results = await Promise.all(Array(1).fill(0).map(() => (
      //console.log("IN")
      scheduler.addJob('recognize', image)
    )))
    var text = results[0].data.text;
    //var text = "TEST";
    console.log(text);
    const body = {
      status: "DONE",
      analysis: text,
      done_at: date,
      user: user
    };
    console.log(body)
    fetch(url+"/"+key, {
      method: 'patch',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      });
    //await worker1.terminate();
    })();
    //const { data: { text } } = await worker1.recognize(image);
    //console.log(text);

}
