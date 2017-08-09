var config = require('config.json');
var express = require('express');
var router = express.Router();
var formService = require('services/form.service');

// routes
router.post('/', addForm);
router.get('/', listForm);
router.get('/:_id', getForm);
router.put('/:_id', updateForm);
router.delete('/:_id', _deleteForm);

module.exports = router;


function addForm(req, res) {
    formService.create(req.body)
        .then(function (form) {
            res.send(form);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listForm(req, res) {
    formService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getForm(req, res) {
    formService.getById(req.params._id)
        .then(function (form) {
            if (form) {
                res.send(form);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateForm(req, res) {
    formService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _deleteForm(req, res) {
    formService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}