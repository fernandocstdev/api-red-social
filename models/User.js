import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const UserSchema = Schema({
	name: {
		type: String,
		require: true
	},
	surname: String,
	nick: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	role: {
		type: String,
		default: 'role_user'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

UserSchema.plugin(mongoosePaginate)

const UserModel = model('User', UserSchema, 'users')

export default UserModel
