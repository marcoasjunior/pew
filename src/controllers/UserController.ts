import { Request, Response } from "express";

interface IUserController {

    create: (req: Request, res: Response) => Promise<void>,
    update: (req: Request, res: Response) => Promise<void>,
    delete: (req: Request, res: Response) => Promise<void>,
    
    
}

export default class UserController implements IUserController {

    async create(req, res) {

        

    }

    async update(req, res) {



    }

    async delete(req, res) {



    }



}