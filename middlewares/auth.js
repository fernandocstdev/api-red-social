import jwt from 'jwt-simple'
import moment from 'moment'
import { secret } from '../services/jwt.js'

export function authMiddleware(req, res, next) {
	const token = req.header('auth-token')
	if (!token) return res.status(401).json({ error: 'Acceso denegado' })

	try {
		const payload = jwt.decode(token, secret)

		if (payload.exp <= moment().unix()) {
			return res.status(401).json({ error: 'El token ha expirado' })
		}

		req.user = payload
		next()
	} catch (err) {
		res.status(400).json({ error: 'Token inválido' })
	}
}
