'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/hi', function (req, res) {
  res.send('γεια');
})
.response(['text/plain'], 'Hi in greek')
.summary('Greek greeting')
.description('Prints the greek greeting.');

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;
const receiptsCollection = db._collection('receipts');
const usersCollection = db._collection('users');
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

// RECEIPTS ----------------------------------------------------------------
// store schema in variable to make it re-usable, see .body()
const receiptDocSchema = joi.object().required().keys({
  date: joi.string(),
  total: joi.number(),
  location: joi.string(),
  user: joi.number().required()
}).unknown(); // allow additional attributes

router.get('/receipts/:key', function (req, res) {
  const receipts = db._query(aql`
    FOR r IN ${receiptsCollection}
    FILTER r.user == ${req.pathParams.key}
    RETURN r
  `);
  res.send(receipts);
})
.pathParam('key', joi.number().required(), 'Key of the user.')
.response(joi.array().items(
  joi.string().required()
).required(), 'List of receipts.')
.summary('Lists receipts')
.description('Lists receipts');

router.post('/receipts', function (req, res) {
  const data = receiptsCollection.save(req.body);
  res.send(data);
})
.body(receiptDocSchema, 'Receipt  to store in the collection.')
.response(joi.object().required(), 'Receipt stored in the collection.')
.summary('Store receipt')
.description('Store receipt in the receipts collection.');

router.patch('/receipts/:key', function (req, res) {
  console.log(req.pathParams.key)
  console.log(req.body)
  //const data = receiptsCollection.update(req.pathParams.key,req.body);
  const receipt = db._query(aql`
    FOR r IN ${receiptsCollection}
      FILTER r._key == ${req.pathParams.key}
      UPDATE r WITH ${req.body} IN ${receiptsCollection}
    RETURN r
  `);
  res.send(receipt)
})
.body(receiptDocSchema, 'Receipt  to update in the collection.')
.pathParam('key', joi.string().required(), 'Key of the Receipt.')
.response(joi.object().required(), 'Receipt stored in the collection.')
.summary('Updates a Receipt')
.description('Updates a Receipt based on a key');
