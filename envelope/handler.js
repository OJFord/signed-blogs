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

const single_response = (user, title, file) => `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${user} | ${title}</title>
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/common.css">
            <link rel="stylesheet" type="text/css" href="//${user}.keybase.pub/envelope/.config/single.css">
            <script src='//cdnjs.cloudflare.com/ajax/libs/markdown.js/0.5.0/markdown.min.js'></script>
            <script id="post-data" type="text/plain">${file}</script>
            <script>
                function render() {
                    var data = document.getElementById('post-data').text;
                    var post = document.getElementById('post');
                    post.innerHTML = markdown.toHTML(data);
                }
                window.onload = render;
            </script>
        </head>
        <body>
            <div id="post"></div>
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

function single_post(user, fname, callback) {
    let url = `https://${user}.keybase.pub/envelope/${fname}`;
    request(url, (err, _, data) => callback(err, single_response(user, fname, data)));
}

function lookup_user(id, callback) {
    if(id.includes('@')){
        let username = id.split('@')[0];
        let service = id.split('@')[1];
        let url = `https://keybase.io/_/api/1.0/user/lookup.json?${service}=${username}`;

        request(url, function(err, _, body){
            if(err){
                callback(err);
            } else {
                callback(null, JSON.parse(body).them[0].basics.username);
            }
        });
    } else {
        callback(null, id);
    }
}

exports.view = function(event, context, callback) {
    lookup_user(event.user, function(err, user){
        if(event.title !== undefined){
            single_post(user, title, callback);
        } else {
            list_posts(user, callback);
        }
    });
}
