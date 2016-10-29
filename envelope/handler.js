'use strict';
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');

exports.view = function(event, context, callback) {
    if(event.title !== undefined){
        callback(null, 'Reading single');
    } else {
        request('https://keybase.pub/' + event.user + '/envelope', function(err, _, html){
            if(!err){
                var $ = cheerio.load(html);
                var files = $('.directory table').find('td.name-col a').slice(1);

                async.reduce(files, `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>${event.user}'s Signed Blog</title>
                            <link rel="stylesheet" type="text/css" href="//${event.user}.keybase.pub/envelope/.config/common.css">
                            <link rel="stylesheet" type="text/css" href="//${event.user}.keybase.pub/envelope/.config/list.css">
                        </head>
                        <body>
                            <h1>${event.user}\'s Signed Blog</h1>
                            <div id="articles">
                `, function(memo, el, done){
                    var fname = $(el).text();

                    if(fname.startsWith('.')){
                        done(null, memo);
                    } else {
                        done(null, memo + `
                            <div class="article">
                                <a href="${fname}">
                                    <h2>${fname}</h2>
                                </a>
                            </div>
                        `);
                    }
                }, function(err, response){
                    response += '</div></body></html>';
                    callback(err, response);
                });
            }
            else{
                callback(err);
            }
        });
    }
}
