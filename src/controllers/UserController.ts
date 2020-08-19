import { Request, Response } from "express";
import User from "../database/models/User";
import { Document } from 'mongoose';
interface IUserController {

    create: (req: Request, res: Response) => Promise<Response>,
    index: (req: Request, res: Response) => Promise<Response>,
    update: (req: Request, res: Response) => Promise<Response>,
    delete: (req: Request, res: Response) => Promise<Response>,
    
}
class UserController implements IUserController {

    public async create(req: Request, res: Response): Promise<Response> {

        const userData = req.body     
        const user = new User(userData)

        try {

                const savedUser = await user.save()
                return res.json(savedUser)

        } catch (error) {

                console.log(error)
                res.json(error)
                throw new Error("Failed to create User");              
                
        }
    }

    public async index(req: Request, res: Response): Promise<Response> {

        try {

                const users = await User.find()
                return res.json(users)

        } catch (error) {

                console.log(error)
                res.json(error)
                throw new Error("Failed to find users");              
                
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {

        const id = req.params.id
        const userData = req.body

        try {

                const updatedUser = await User.findByIdAndUpdate(id, userData)
                return res.json(updatedUser)

        } catch (error) {

                console.log(error)
                res.json(error)
                throw new Error("Failed to update User");              
                
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const id = req.params.id

        try {

                const removedUser = await User.findByIdAndRemove(id)
                return res.json(removedUser)

        } catch (error) {

                console.log(error)
                res.json(error)
                throw new Error("Failed to delete User");              
                
        }
    }
}

export default new UserController()