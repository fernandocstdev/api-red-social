import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const FollowSchema = Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	followed: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

FollowSchema.plugin(mongoosePaginate)

const FollowModel = model('Follow', FollowSchema, 'follows')

export default FollowModel
