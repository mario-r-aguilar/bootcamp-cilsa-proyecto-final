import jwt from 'jsonwebtoken';
import environment from '../config/env.config.js';

export const validUserRoles = (roles) => {
	return (req, res, next) => {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).send({
				status: 'error',
				message: "Access denied, no token provided (middleware's error)",
			});
		}

		try {
			const verified = jwt.verify(token, environment.jwt_secret);
			const userRole = verified.role;

			if (!roles.includes(userRole)) {
				return res.status(403).send({
					status: 'error',
					message:
						"Access denied, you do not have permissions (middleware's error)",
				});
			}

			next();
		} catch (error) {
			return res.status(403).send({
				status: 'error',
				message: "Cannot check user role, invalid token (middleware's error)",
			});
		}
	};
};
