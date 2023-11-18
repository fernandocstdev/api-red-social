import PuclicationModel from '../models/Publication.js'
import { validatePublication } from '../schemas/publications.js'

export class PublicationController {
	static async getAll(req, res) {
		const { page } = req.query
		let pageNumber = 1
		const itemsPerPage = 5

		if (page) pageNumber = Number(page)

		const publications = await PuclicationModel.paginate({}, { page: pageNumber, limit: itemsPerPage })

		return res.status(200).json({
			status: 'succes',
			publications
		})
	}

	static async getAllByUser(req, res) {
		const { id } = req.params
		const { page } = req.query
		let pageNumber = 1
		const itemsPerPage = 5

		if (page) pageNumber = Number(page)

		const options = {
			page: pageNumber,
			limit: itemsPerPage
		}

		const publications = await PuclicationModel.paginate({ user: id }, options)

		return res.status(200).json({ publications })
	}

	static async getOne(req, res) {
		const { idPublication } = req.params

		const publication = await PuclicationModel.findById(idPublication).exec()

		return res.status(200).json({ publication })
	}

	static async create(req, res) {
		const { id } = req.user
		const result = validatePublication(req.body)

		if (!result.success) {
			return res.status(400).json({
				message: 'Error',
				error: JSON.parse(result.error.message)
			})
		}

		const data = {
			user: id,
			text: result.data.text
		}

		/* const newPublication = await new PuclicationModel(data)
		await newPublication.save() */

		return res.status(200).json({ publication: data })
	}

	static async delete(req, res) {
		try {
			const { id } = req.params
			const publication = await PuclicationModel.findById(id)
			await publication.deleteOne()

			return res.status(200).json({ message: 'Publication deleted successfully' })
		} catch (err) {
			return res.status(500).json({ error: JSON.stringify(err) })
		}
	}
}
