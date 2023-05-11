var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

let accounts = [
	{
		id: 1,
		userName: 'Rommel',
		email: 'rommelocon@gmail.com',
		password: '12345678',
		firstName: 'Rommel',
		lastName: 'Ocon',
	},
	{
		id: 2,
		userName: 'Ralph',
		email: 'ralpharcos@gmail.com',
		password: 'abcdefg',
		firstName: 'Ralph',
		lastName: 'Arcos',
	},
];

router.get('/', (req, res, next) => {
	res.send(accounts);
});

router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		accounts.push({
			id: accounts.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		});
		res.redirect('/login');
		console.log(accounts);
	} catch (e) {
		console.log(e);
		res.redirect('/register');
	}
});

router.post('/login', (req, res) => {
	const account = {
		email: req.body.email,
		password: req.body.password,
	};
	console.log(account);
	const user = accounts.find(
		(item) => item.email == account.email && item.password == account.password
	);

	if (user) {
		res.status(200).json({ success: true, user });
	} else {
		res.status(401).json({
			success: false,
			message: 'Invalid credentials',
		});
	}
});

module.exports = router;
