import * as express from 'express'
import UserController from '../controllers/UserController';

const router = express.Router()

router.get('/user', UserController.index)

router.post('/user', UserController.create)

router.put('/user/:id', UserController.update)

router.delete('/user/:id', UserController.delete)

export default router
