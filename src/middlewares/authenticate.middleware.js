import jwt from 'jsonwebtoken';
import environment from '../config/env.config.js';

export const authenticateToken = (req, res, next) => {
	const token = req.header('Authorization')?.split(' ')[1];

	if (!token) {
		return res.status(401).send({
			status: 'error',
			message: "Access denied, no token provided (middleware's error)",
		});
	}

	try {
		const verified = jwt.verify(token, environment.jwt_secret);
		req.user = verified;
		next();
	} catch (error) {
		return res.status(403).send({
			status: 'error',
			message: "Unauthorized, invalid token (middleware's error)",
		});
	}
};
