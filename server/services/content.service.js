var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('contents');

var service = {};


service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;



function getAll() {
    var deferred = Q.defer();

    db.contents.find().toArray(function (err, contents) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return contents (without hashed passwords)
        contents = _.map(contents, function (content) {
            return _.omit(content, 'hash');
        });

        deferred.resolve(contents);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.contents.findById(_id, function (err, content) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (content) {
            // return content (without hashed password)
            deferred.resolve(content);
        } else {
            // content not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(contentParam) {
    var deferred = Q.defer();

    // validation
//    db.contents.findOne(
//        { name: contentParam.name },
//        function (err, content) {
//            if (err) deferred.reject(err.name + ': ' + err.message);
//
//            if (content) {
//                // name already exists
//                deferred.reject('Name "' + contentParam.name + '" is already taken');
//            } else {
                createContent();
//            }
//        });

    function createContent() {

        db.contents.insert(
            contentParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, contentParam) {
    var deferred = Q.defer();

    // validation
    db.contents.findById(_id, function (err, content) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (content.name !== contentParam.name) {
            // name has changed so check if the new name is already taken
            db.contents.findOne(
                { name: contentParam.name },
                function (err, content) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (content) {
                        // name already exists
                        deferred.reject('Name "' + req.body.name + '" is already taken')
                    } else {
                        updateContent();
                    }
                });
        } else {
            updateContent();
        }
    });

    function updateContent() {
        // fields to update
        var set = {
            name: contentParam.name,
            description: contentParam.description,
            fields: contentParam.fields,
            form: contentParam.form,
        };



        db.contents.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.contents.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}