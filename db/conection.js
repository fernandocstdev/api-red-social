import mongoose from 'mongoose'

export const conection = async () => {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/social_network')

		console.log('Collection conection:', mongoose.connection.name)
	} catch (e) {
		console.error(e)
		throw new Error('Could not connect to')
	}
}
