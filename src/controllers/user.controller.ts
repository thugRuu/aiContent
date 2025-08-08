import { Request,Response } from "express";

const users = [
  { id: 1, name: "Sabin" },
  { id: 2, name: "Sandhya" },
];

export const getUsers = (req:Request,res:Response)=>{
    res.json(users)
}