var config = require('config.json');
var express = require('express');
var router = express.Router();
var contentService = require('services/content.service');

// routes
router.post('/', addContent);
router.get('/', listContent);
router.get('/:_id', getContent);
router.put('/:_id', updateContent);
router.delete('/:_id', _deleteContent);

module.exports = router;


function addContent(req, res) {
    contentService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listContent(req, res) {
    contentService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getContent(req, res) {
    contentService.getById(req.params._id)
        .then(function (content) {
            if (content) {
                res.send(content);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateContent(req, res) {
    contentService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _deleteContent(req, res) {
    contentService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}