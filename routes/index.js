var router = require('express').Router();

router.get('/', function(req, res){
	res.render('index');
});

router.post('/', function(req, res){
	if( req.body.service === 'keybase'
	|| req.body.service === '' ){
		res.redirect('/'+req.body.user);
	}
	else{
		res.redirect('/'+req.body.user+'@'+req.body.service);
	}
})

module.exports = router;
