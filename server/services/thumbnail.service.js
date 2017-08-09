var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var im = require("imagemagick");
var fs = require('fs');

var service = {};

service.resize = resize;

module.exports = service;

function resize(file) {

    var deferred = Q.defer();

    var options = {
        width: 150,
        height: 150,
        srcPath: "uploads/" + file.filename,
        dstPath: "thumbnails/" + file.filename
    };
    if(fs.existsSync(options.dstPath)){ console.log('file exists');
        deferred.resolve(options.dstPath);
    }else{
      im.resize(options, function(err) {
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }else{
             deferred.resolve(options.dstPath);
            }
        });
    }


    return deferred.promise;
}
