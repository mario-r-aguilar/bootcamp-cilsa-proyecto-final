import dotenv from 'dotenv';
dotenv.config();

export default {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	jwt_secret: process.env.JWT_SECRET,
	secure_cookie: process.env.SECURE_COOKIE,
};
