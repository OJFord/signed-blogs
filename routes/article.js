var router	= require('express').Router();
var request	= require('request');
var marked	= require('marked');

router.get('/:user/:title', function(req, res){
	var id = req.params.user.split('@');

	var username= id[0];
	var service;
	if(id.length > 1){
		service = id[1];
	}

	function showArticle(){
		var fname	= req.params.title;
		var splat	= fname.split('.');
		var fext	= splat[ splat.length - 1 ];

		var markup	= fext === 'md' || req.query.forceMD === 'true';

		var url = 'https://' + username + '.keybase.pub/' + fname;
		request(url, function(err, _, body){
			if(!err){
				console.log('Found article');
				res.render('article', {
					title:	fname,
					user:	req.params.user,
					article:(markup) ? marked(body) : body,
					type:	'txt',
					forceMD:markup
				});
			}
			else{
				console.log(err);
			}
		});
	}

	if( service !== undefined && service !== 'keybase' ){
		// lookup Keybase.io username
		request('https://keybase.io/_/api/1.0/user/lookup.json?'
		+ service + '=' + username, function(err, res){
			username = JSON.parse(res.body).them[0].basics.username;
			console.log('Looked up Keybase user, found', username);
			showArticle();
		});
	}
	else{
		showArticle();
	}
});

module.exports = router;
