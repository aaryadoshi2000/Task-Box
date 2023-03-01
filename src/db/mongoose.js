const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aarya6780:Mayur211065@cluster0.zebwpay.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
