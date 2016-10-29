'use strict';
const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const list_response = (user) => `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${user}'s Signed Blog</title>
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/common.css">
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/list.css">
        </head>
        <body>
            <h1>${user}\'s Signed Blog</h1>
            <div id="articles">
`;

const list_item = (title) => `
                <div class="article">
                    <a href="${title}">
                        <h2>${title}</h2>
                    </a>
                </div>
`

const end_list = (response) => `
                ${response}
            </div>
        </body>
    </html>
`;

const single_response = (user, title, rendered_body) => `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${user} | ${title}</title>
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/common.css">
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/single.css">
        </head>
        <body>
            <h1>${title}</h1>
            <div id="post">
                ${rendered_body}
            </div>
        </body>
    </html>
`

function list_posts(user, callback) {
    request(`https://keybase.pub/${user}/envelope`, function(err, _, html){
        if(!err){
            const $ = cheerio.load(html);
            let files = $('.directory table').find('td.name-col a').slice(1);

            async.reduce(files, list_response(user), function(memo, el, done){
                let fname = $(el).text();

                if(fname.startsWith('.')){
                    done(null, memo);
                } else {
                    done(null, memo + list_item(fname));
                }
            }, (err, response) => callback(err, end_list(response)));
        }
        else{
            callback(err);
        }
    });
}

function render_markdown(url, callback){
    request(url, function(err, _, html){
        if(!err){
            return callback(null, html); // fake it 'til you make it
        } else {
            return callback(err);
        }
    });
}

function single_post(user, fname, callback){
    render_markdown(`https://${user}.keybase.pub/envelope/${fname}`, function(err, body){
        callback(null, single_response(user, fname, body));
    });
}

exports.view = function(event, context, callback) {
    if(event.title !== undefined){
        single_post(event.user, event.title, callback);
    } else {
        list_posts(event.user, callback);
    }
}
