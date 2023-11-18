import { Router } from 'express'
import { FollowController } from '../controllers/follows.js'
import { authMiddleware } from '../middlewares/auth.js'
export const followsRouter = Router()

followsRouter.get('/followers', authMiddleware, FollowController.followers)
followsRouter.get('/following', authMiddleware, FollowController.following)
followsRouter.post('/follow', authMiddleware, FollowController.follow)
followsRouter.delete('/unfollow/:id', authMiddleware, FollowController.unfollow)
