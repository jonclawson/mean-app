var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('forms');

var service = {};


service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;



function getAll() {
    var deferred = Q.defer();

    db.forms.find().toArray(function (err, forms) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return forms (without hashed passwords)
        forms = _.map(forms, function (form) {
            return _.omit(form, 'hash');
        });

        deferred.resolve(forms);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.forms.findById(_id, function (err, form) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (form) {
            // return form (without hashed password)
            deferred.resolve(form);
        } else {
            // form not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(formParam) {
    var deferred = Q.defer();

    // validation
//    db.forms.findOne(
//        { _id: formParam._id },
//        function (err, form) {
//            if (err) deferred.reject(err.name + ': ' + err.message);
//
//            if (form) {
//                // name already exists
//                deferred.reject('Name "' + formParam.name + '" is already taken');
//            } else {
                createForm();
//            }
//        });

    function createForm() {

        db.forms.insert(
            formParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(doc);
            });
    }

    return deferred.promise;
}

function update(_id, formParam) {
    var deferred = Q.defer();

    // validation
    db.forms.findById(_id, function (err, form) {
        if (err) deferred.reject(err.name + ': ' + err.message);

//        if (form.name !== formParam.name) {
//            // name has changed so check if the new name is already taken
//            db.forms.findOne(
//                { name: formParam.name },
//                function (err, form) {
//                    if (err) deferred.reject(err.name + ': ' + err.message);
//
//                    if (form) {
//                        // name already exists
//                        deferred.reject('Name "' + req.body.name + '" is already taken')
//                    } else {
//                        updateForm();
//                    }
//                });
//        } else {
            updateForm();
//        }
    });

    function updateForm() {
        // fields to update
        var set = {
            name: formParam.name,
            title: formParam.title,
            action: formParam.action,
            public: formParam.public,
            method: formParam.method,
            fields: formParam.fields,
        };



        db.forms.update(
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

    db.forms.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}