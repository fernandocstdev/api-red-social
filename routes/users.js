import { Router } from 'express'
import { UserController } from '../controllers/users.js'
import { authMiddleware } from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/users/:page?', authMiddleware, UserController.getAll)
usersRouter.get('/user/:id', authMiddleware, UserController.getById)
usersRouter.patch('/user/:id', authMiddleware, UserController.updateUser)
usersRouter.delete('/user/:id', authMiddleware, UserController.delete)
usersRouter.post('/users/create', UserController.createUser)
usersRouter.post('/users/login', UserController.loginUser)
