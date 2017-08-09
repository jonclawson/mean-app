var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('files');

var service = {};


service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;



function getAll() {
    var deferred = Q.defer();

    db.files.find().toArray(function (err, files) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return files (without hashed passwords)
        files = _.map(files, function (file) {
            return _.omit(file, 'hash');
        });

        deferred.resolve(files);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.files.findById(_id, function (err, file) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (file) {
            // return file (without hashed password)
            deferred.resolve(file);
        } else {
            // file not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(fileParam) {
    var deferred = Q.defer();

    // validation
    db.files.findOne(
        { filename: fileParam.filename },
        function (err, file) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (file) {
                // name already exists
                deferred.reject('Name "' + fileParam.filename + '" is already taken');
            } else {
                createFile();
            }
        });

    function createFile() {

        db.files.insert(
            fileParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, fileParam) {
    var deferred = Q.defer();

    // validation
    db.files.findById(_id, function (err, file) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (file.name !== fileParam.name) {
            // name has changed so check if the new name is already taken
            db.files.findOne(
                { name: fileParam.name },
                function (err, file) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (file) {
                        // name already exists
                        deferred.reject('Name "' + req.body.name + '" is already taken')
                    } else {
                        updateFile();
                    }
                });
        } else {
            updateFile();
        }
    });

    function updateFile() {
        // fields to update
        var set = {
            name: fileParam.name,
            description: fileParam.description,
        };



        db.files.update(
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

    db.files.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}