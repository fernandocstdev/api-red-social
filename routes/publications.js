import { Router } from 'express'
import { PublicationController } from '../controllers/publications.js'
import { authMiddleware } from '../middlewares/auth.js'

export const publicationRouter = Router()

publicationRouter.get('/publications', PublicationController.getAll)
publicationRouter.get('/publications/:id', PublicationController.getAllByUser)
publicationRouter.get('/publications/:idPublication', PublicationController.getOne)
publicationRouter.post('/publications', authMiddleware, PublicationController.create)
publicationRouter.delete('/publications/:id', authMiddleware, PublicationController.delete)
