const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const cors = require('cors');
const env = require('dotenv').config()

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api',userRouter);
app.use('/api',taskRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
