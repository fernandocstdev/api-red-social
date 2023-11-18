import jwt from 'jwt-simple'
import moment from 'moment'

export const secret = 'secret_key_for_generated_token'

export const createToken = (user) => {
	const payload = {
		id: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, secret)
}
