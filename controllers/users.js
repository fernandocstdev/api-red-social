import UserModel from '../models/User.js'
import { validatePartialUser, validateUser } from '../schemas/users.js'
import bcrypt from 'bcrypt'
import { createToken } from '../services/jwt.js'

export class UserController {
	static async getAll(req, res) {
		const { page } = req.params
		let pageNumber = 1
		const itemsPerPage = 5

		if (page) pageNumber = Number(page)

		const { docs, totalDocs, limit, totalPages } = await UserModel.paginate({}, { page: pageNumber, limit: itemsPerPage })

		return res.status(200).json({
			status: 'success',
			message: 'Users paginated',
			users: docs,
			page: pageNumber,
			limit,
			total: totalDocs,
			totalPages
		})
	}

	static async getById(req, res) {
		const { id } = req.params

		try {
			const user = await UserModel.findById(id).exec()

			if (!user) {
				return res.status(400).json({ error: 'User not found' })
			}

			return res.status(200).json({ message: 'User by id', data: user })
		} catch (err) {
			return res.status(400).json({ error: JSON.stringify(err) })
		}
	}

	static async createUser(req, res) {
		const result = validateUser(req.body)
		const { password } = req.body

		if (!result.success) {
			return res.status(400).json({
				message: 'Error',
				error: JSON.parse(result.error.message)
			})
		}

		const encryptedPassword = await bcrypt.hash(password, 10)

		const data = {
			id: crypto.randomUUID(),
			...result.data,
			password: encryptedPassword
		}

		const newUser = await new UserModel(data)
		await newUser.save()
		return res.status(200).json(newUser)
	}

	static async loginUser(req, res) {
		const { email, password } = req.body
		const user = await UserModel.findOne({ email }).exec()

		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		const pwd = bcrypt.compareSync(password, user.password)

		if (!pwd) {
			return res.status(400).json({ error: 'Password incorrect' })
		}

		const token = createToken(user)

		const userData = {
			id: user.id,
			email: user.email,
			role: user.role,
			nick: user.nick,
			token
		}

		return res.status(200).json({ message: 'User loged', data: userData })
	}

	static async updateUser(req, res) {
		const result = validatePartialUser(req.body)

		if (!result) {
			return res.status(400).json({ error: JSON.parse(result.error.message) })
		}
		const { id } = req.params
		const user = await UserModel.findById(id)

		const dataUpdated = {
			...user._doc,
			...result.data
		}
		await user.updateOne(result.data)

		return res.status(200).json(dataUpdated)
	}

	static async delete(req, res) {
		try {
			const { id } = req.params
			const user = await UserModel.findById(id)
			await user.deleteOne()

			return res.status(200).json({ message: 'User deleted successfully' })
		} catch (err) {
			return res.status(500).json({ error: JSON.stringify(err) })
		}
	}
}
