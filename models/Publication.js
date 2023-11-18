import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const PublicationSchema = Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	text: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}

})

PublicationSchema.plugin(mongoosePaginate)

const PuclicationModel = model('Puclication', PublicationSchema, 'publications')

export default PuclicationModel
