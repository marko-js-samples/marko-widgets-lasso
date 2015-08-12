require('./configure');

var fs =     require('fs');
var path =   require('path');
var async =  require('async');
var routes = require('./routes');

async.series(
    routes.map(function(route) {

        return function writeHtmlFile(callback) {
            var outputFile = path.join(__dirname, 'build/' + route.path + '/index.html');

            console.log('Building ' + outputFile + '...');

            var out = fs.createWriteStream(outputFile, { encoding: 'utf8' });

            out.on('finish', callback)
                .on('error', callback);

            route.handler(
                route.templateData,
                out);
        };

    }),
    function (err) {

        if (err) {
            throw err;
        }

        console.log('Build complete!');
    });