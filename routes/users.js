var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var user_email = req.session.user_email;
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next){
	res.send('아마존 웹서버 더미서버 get 테스트, by임현수');
});

router.post('/signup', function(req, res, next){
	// console.log('req=', req.body);
	var email = req.body.email;
	var pw = req.body.pw;
	var nickname = req.body.nickname;

	var data = {
		email : email,
		pw : pw,
		nickname : nickname
	};
	var user = new UserModel(data);

	user.save(function(err, doc){
		if(err) console.log('err=', err);
		console.log('doc=', doc);
	});
	res.send('아마존 웹서버 더미서버 post 테스트, by임현수');
});



// /* GET users listing. */
// router.get('/', function(req, res, next) {
// 	var user_id = req.session.user_id;
// 	console.log('user_id=', user_id);
// 	// 로그인 전: user_id= undefined
// 	// 로그인 후: user_id= hong
// 	res.render('users/users', { title: "로그인", user_id: user_id });
// });

// router.get('/login', function(req, res, next){
// 	res.render('users/loginform', { title: "로그인" });
// });

// router.post('/login', function(req, res, next){
// 	console.log('req.body=', req.body);
// 	var id = req.body.id;
// 	var pw = req.body.pw;
// 	UserModel.findOne({ user_id: id, user_pw: pw }, function(err, doc){
// 		if(err) console.log('err=', err);
// 		console.log(doc);
// 		if(doc){
// 			UserModel.findOne({ user_id: id, user_pw: pw, del_yn: 'N'}, function(err, doc2){
// 				if(err) console.log('err=', err);
// 				console.log(doc2);
// 				if(doc2){
// 					req.session.user_id = doc2.user_id;
// 					res.send('<script>location.href="/users/"</script>');
// 				} else {
// 					res.send('<script>alert("탈퇴된 아이디입니다.");history.back();</script>');
// 				}
// 			});
// 		} else {
// 			res.send('<script>alert("아이디나 비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
// 		}
// 	});
// });

// router.get('/logout', function(req, res, next){
// 	req.session.destroy(function(err){
// 		if(err) console.log('err=', err);
// 		console.log('logout req.session=', req.session);
// 		res.send('<script>alert("로그아웃 되었습니다.");location.href="/users/"</script>')
// 	});
// });

// // 로그인한 사용자만 올 수 있는 페이지라고 가정
// router.get('/loginonly', function(req, res, next){
// 	var user_id = req.session.user_id;
// 	if(user_id){
// 		res.send("서비스를 이용할 수 있습니다.");
// 	}else{
// 		res.send('<script>alert("로그인을 먼저 해주세요.");location.href="/users/"</script>');
// 	}
// });


// router.get('/signup', function(req, res, next){
// 	res.render('users/signup', { title: "회원가입" });
// });

// router.post('/signup', function(req, res, next){
// 	console.log('req.body=', req.body);
// 	var user_id = req.body.id;
// 	var user_pw = req.body.pw;
// 	var user_email = req.body.email;

// 	var data = {
// 		user_id: user_id,
// 		user_pw: user_pw,
// 		user_email: user_email
// 	};
// 	var user = new UserModel(data);
// 	// 유저 ID와 EMAIL 을 검증하는 부분이 필요하다.
// 	UserModel.findOne( {user_id:user_id}, function(err, doc){
// 		if(err) console.log('get validate err=', err);
// 		console.log('get validate id=', doc);
// 		if(doc){
// 			res.send('<script>alert("중복된 아이디입니다.");history.back();</script>');
// 		}else{
// 			UserModel.findOne( { user_email: user_email }, function(err, doc){
// 				if(err) console.log('get validate err=', err);
// 				console.log('get validate doc=', doc);
// 				if(doc){
// 					res.send('<script>alert("중복된 이메일입니다.");history.back();</script>');
// 				}else{
// 					user.save(function(err, doc){
// 						console.log('doc=', doc);
// 						res.redirect('/users/login');
// 					});
// 				}
// 			});
// 		}
// 	});
// });

// router.get('/update', function(req, res, next){
// 	var user_id = req.session.user_id;
// 	if(user_id){
// 		UserModel.findOne({user_id:user_id}, function(err, doc){
// 			if(err) console.log('get update err=', err);
// 			console.log('get update doc=', doc);
// 			res.render('users/updateform', { title: "회원정보 수정", doc:doc });
// 		});
// 	}else{
// 		res.send('<script>alert("로그인을 먼저 해주세요.");location.href="/users/"</script>');
// 	}
// });

// router.post('/update', function(req, res, next){
// 	console.log('req.body=', req.body);
// 	var user_id = req.body.id;
// 	var user_pw = req.body.pw;
// 	var user_email = req.body.email;

// 	UserModel.update({ user_id:user_id, user_pw:user_pw }, { user_email: user_email },
// 		function(err, doc){
// 			if(err) console.log('err=', err);
// 			console.log('post update doc=', doc);
// 			if(doc.n == 1){
// 				res.redirect('/users/')
// 			}else{
// 				res.send('<script>alert("아이디나 비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
// 			}

// 	});
// });

// router.get('/delete', function(req, res, next){
// 	var user_id = req.session.user_id;
// 	if(!req.session.user_id){
// 		return res.send('<script>alert("로그인을 먼저 해주세요."; location.href="/users/"</script>');
// 	}
// 	res.render('users/deleteform', { title:"회원탈퇴", user_id:user_id });
// });

// router.post('/delete', function(req, res, next){
// 	console.log('req.body=', req.body);
// 	var user_id = req.session.user_id;
// 	var user_pw = req.body.pw;
// 	UserModel.update({ user_id: user_id, user_pw: user_pw }, {del_yn: "Y"}, function(err, doc){
// 		if(err) console.log('post delete err=', err);
// 		console.log('post delete doc=', doc);
// 		if(doc.n == 1){
// 			req.session.destroy(function(err){
// 				if(err) console.log('err=', err);
// 				console.log('logout req.session=', req.session);
// 				res.send('<script>alert("탈퇴 완료 후 로그아웃 되었습니다.");location.href="/users/"</script>');
// 			});
// 		}else{
// 			res.send('<script>alert("아이디나 비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
// 		}
// 	});
// });

module.exports = router;