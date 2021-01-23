import { Request, Response } from 'express'
import { Database } from "../database";
import { Role } from "../entities/Role";

class IndexController {
  public async indexWelcome(req: Request, res: Response): Promise<Response | void> {
    try {
      return res.status(201).json("Welcome to API Auth - Patrones de diseño"); 
    } catch (error) {
      console.log(error)
    }
  }
}

export const indexController = new IndexController();