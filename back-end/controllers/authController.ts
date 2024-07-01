import {Request,Response} from "express"

const loginController = (req: Request,res: Response) => {
    return res.status(200).json({message : "hello"})
}

const registerController = (req: Request,res: Response) => {
    return res.status(200).json({message : "hello"})
}



export {loginController,registerController}