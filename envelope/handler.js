'use strict';
//var cheerio = require('cheerio');

exports.view = function(event, context, callback) {
    if (event.title !== undefined) {
        callback(null, "Reading single");
    } else {
        callback(null, "Listing many");
    }
}
