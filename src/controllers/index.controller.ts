import { Request, Response } from 'express'
import { Database } from "../database";

const conn = Database.getInstance();

export async function indexWelcome(req: Request, res: Response):  Promise<Response | void> {
  try {
    const roles = await conn.query('SELECT * FROM Role');
    return res.status(201).json(roles[0]); 
  } catch (error) {
    console.log(error)
  }
}