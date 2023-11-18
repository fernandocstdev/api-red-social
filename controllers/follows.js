import FollowModel from '../models/Follow.js'
// import UserModel from '../models/User.js'

export class FollowController {
	static async followers(req, res) {
		const { id } = req.user
		const { page } = req.params
		let pageNumber = 1
		const itemsPerPage = 10

		if (page) pageNumber = Number(page)

		const options = {
			page: pageNumber,
			limit: itemsPerPage,
			populate: {
				path: 'followed',
				select: 'name surname nick  '
			}
		}

		const follows = await FollowModel.paginate({ user: id }, options)

		return res.status(200).json({ message: 'Follows', data: follows })
	}

	static async following(req, res) {
		const { id } = req.user

		const follows = await FollowModel.find({ user: id })

		return res.status(200).json({ message: 'Follows', data: follows })
	}

	static async follow(req, res) {
		const { idUser } = req.body
		const { id } = req.user

		const data = {
			user: id,
			followed: idUser
		}

		const newFollow = await new FollowModel(data)
		await newFollow.save()

		return res.status(200).json({ message: 'Follow created', data: newFollow })
	}

	static async unfollow(req, res) {
		try {
			const { id } = req.params
			const { id: idUser } = req.user

			const follow = await FollowModel.deleteOne({ user: idUser, followed: id }).exec()

			return res.status(200).json({ message: 'Follow deleted', data: follow })
		} catch (error) {
			return res.status(400).json({ error: 'Error' })
		}
	}
}
