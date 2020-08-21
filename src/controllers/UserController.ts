import { Request, Response } from "express";
import User from "../database/models/User";
import { Interaction } from '../services/UserServices'
import UserServices from "../services/UserServices";
interface IUserController {

    create: (req: Request, res: Response) => Promise < Response >,
    index: (req: Request, res: Response) => Promise < Response >,
    update: (req: Request, res: Response) => Promise < Response >,
    delete: (req: Request, res: Response) => Promise < Response >,
    follow: (req: Request, res: Response) => Promise < Response >,
    
}
class UserController implements IUserController {

    public async create(req: Request, res: Response): Promise < Response > {

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

    public async index(req: Request, res: Response): Promise < Response > {

        try {

            const users = await User.find()
            return res.json(users)

        } catch (error) {

            console.log(error)
            res.json(error)
            throw new Error("Failed to find users");

        }
    }

    public async update(req: Request, res: Response): Promise < Response > {

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

    public async delete(req: Request, res: Response): Promise < Response > {

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

    public async follow(req: Request, res: Response): Promise < Response > {

        const { followerId, followedId } = req.body

        const follower = await User.findById(followerId)         
        
        try {

            if (follower.follow.some(item => item.equals(followedId))) throw new Error("Already follow this guy")

            const updatedDocs = await UserServices.followInteraction(Interaction.FOLLOW, followerId, followedId)

            return res.json(`${ updatedDocs.followerUpdate.username } is following ${ updatedDocs.followedUpdate.username }`)

        } catch (error) {

            console.error(error)
            res.status(400).send(error)

        }
    }

    public async unfollow(req: Request, res: Response): Promise < Response > {

        const { followerId, followedId } = req.body     
        
        try {

            const updatedDocs = await UserServices.followInteraction(Interaction.UNFOLLOW, followerId, followedId)

            return res.json(`${ updatedDocs.followerUpdate.username } unfollow ${ updatedDocs.followedUpdate.username }`)

        } catch (error) {

            console.error(error)
            res.status(400).send(error)

        }
    }
}

export default new UserController()