const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const nodemailer = require("nodemailer")


router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.EMAIL_ID,
			  pass: process.env.PASSWORD
			}
		  });


		  let mailObj = {
			from: 'aaryadoshi2000@gmail.com',
			to: req.body.email,
			subject: 'Account Created',
			text: 'You have successfully created your account for Task-Box App which is designed and developed by Aarya Doshi, Click on the link to get started: https://task-box.herokuapp.com/ '
		  };

		  transporter.sendMail(mailObj, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			 
			}
		  });

		res.status(201).send({ user, token });
	} catch (error) {
		console.log("error",error)
		res.status(400).send(error);
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send();
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.token = '';
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	const user = req.user;
	const token = req.token;
	res.send({ user, token });
});

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'age', 'password'];

	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		res.status(400).send({ error: 'Invalid Updates!' });
	}

	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update];
		});
		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(400).send();
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (error) {
		res.status(500).send();
	}
});

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image'));
		}
		cb(undefined, true);
	},
});

router.post(
	'/users/me/avatar',
	auth,
	upload.single('avatar'),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();

		req.user.avatar = buffer;
		await req.user.save();
		res.send(req.user);
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.delete(
	'/users/me/avatar',
	auth,
	async (req, res) => {
		req.user.avatar = undefined;
		await req.user.save();
		res.send(req.user);
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			return new Error();
		}
		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});

module.exports = router;
