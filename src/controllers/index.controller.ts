import { Request, Response } from 'express'
import { Database } from "../database";
class IndexController {
  public async indexWelcome(req: Request, res: Response): Promise<Response | void> {
    try {
      // const roles = await Database.getInstance().query('SELECT * FROM Role');
      // console.log(roles[0])
      return res.status(201).json("Welcome to API Auth - Patrones de diseño"); 
    } catch (error) {
      console.log(error)
    }
  }
}

export const indexController = new IndexController();