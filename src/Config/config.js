require('dotenv').config();

module.exports = {
	token: process.env.TOKEN,
	client: {
		id: '933507489360654386',
		secret: process.env.SECRET
	},
	prefix: '-'
};