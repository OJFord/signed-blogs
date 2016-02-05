var router	= require('express').Router();
var request	= require('request');
var cheerio	= require('cheerio');
var finish	= require('finish');

router.get('/:user', function(req, res){
	var id = req.params.user.split('@');

	var username= id[0];
	var service;
	if(id.length > 1){
		service = id[1];
	}

	function listArticles(){
		console.log('Finding signed articles by', username);

		request('https://keybase.pub/'+username, function(err, _, html){
			if(!err){
				var $ = cheerio.load(html);
				var fnames = [];

				finish(function(async){
					$('.directory table').find('td.name-col a').each(function(i, e){
						var el = $(this);
						async(function(finished){
							var fname	= el.text();
							var splat	= fname.split('.');
							var fext	= splat[ splat.length - 1 ];

							if(fext === 'md' || fext === 'txt'){
								fnames.push(fname);
								finished();
							}
							else{
								finished();
							}
						});
					});
				}, function(){
					console.log('Found articles:', fnames);
					res.render('list', {
						user: req.params.user,
						titles: fnames
					});
				});
			}
			else{
				console.log('Got error: ', err);
			}
		});
	}

	if( service !== undefined && service !== 'keybase' ){
		// lookup Keybase.io username
		request('https://keybase.io/_/api/1.0/user/lookup.json?'
		+ service + '=' + username, function(err, res){
			username = JSON.parse(res.body).them[0].basics.username;
			console.log('Looked up Keybase user, found', username);
			listArticles();
		});
	}
	else{
		listArticles();
	}


});

module.exports = router;
