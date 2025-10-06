import { Request, Response } from "express";
import { verifyJwtToken } from "../services/jwt";

export const adminCheck = async(req:Request,res:Response)=>{
    try{
        const {token}= req.body;
        const payload = verifyJwtToken(token)
        res.json(payload?.role);
    }catch(e){
        console.log("error",e)
    }
}