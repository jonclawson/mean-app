var config = require('config.json');
var express = require('express');
var router = express.Router();
var fileService = require('services/file.service');
var thumbService = require('services/thumbnail.service');
var multer = require('multer');
var mime = require('mime');
var crypto = require('crypto');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
  console.log('file', file);
  //cb(null,  file.originalname);
  //cb(null,  file.originalname + Date.now() + '.' + mime.extension(file.mimetype));
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });
//var upload = multer({dest: 'uploads/'});

// routes
router.post('/', upload.single('file'), addFile);
router.get('/', listFile);
router.get('/:_id', getFile);
router.get('/thumbnail/:_id', getThumbnail);
//router.put('/:_id', updateFile);
router.delete('/:_id', _deleteFile);

module.exports = router;


function addFile(req, res) {
    console.log(req);
    fileService.create(req.file)
        .then(function () {
            res.send(req.file);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listFile(req, res) {
    fileService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getFile(req, res) {
    fileService.getById(req.params._id)
        .then(function (file) {
            if (file) {
                res.send(file);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getThumbnail(req, res){
    fileService.getById(req.params._id)
        .then(function (file) {
            if (file) {
                thumbService.resize(file).then(function(filepath){
                    console.log('thumb', filepath);
                    res.sendFile( global.appRoot + '/' + filepath, {headers:{'Content-Type':'image/png'}}, function(err){
                        console.log('err', err);
                    });
                    //res.sendStatus(200);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//function updateFile(req, res) {
//    fileService.update(req.params._id, req.body)
//        .then(function () {
//            res.sendStatus(200);
//        })
//        .catch(function (err) {
//            res.status(400).send(err);
//        });
//}

function _deleteFile(req, res) {
    fileService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}