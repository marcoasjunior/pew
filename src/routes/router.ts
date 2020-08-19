import * as express from 'express'
import UserController from '../controllers/UserController';

const router = express.Router()

router.get('/user', UserController.index)

router.post('/user', UserController.create)

router.post('/user/follow', UserController.follow)

router.post('/user/unfollow', UserController.unfollow)

router.put('/user/:id', UserController.update)

router.delete('/user/:id', UserController.delete)

export default router
