import { Request,Response } from "express";
import { CandidatesResponse } from "../types/aiResponseType";

export const getAiContent = async (req:Request,res:Response)=>{
    const {text}  = req.body;

    if (!text) {
        return res.json({ error: "Text is required" });
    }

    try{
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey){
            return res.json({error:"Someting is wrong with api"})
        }
        const aiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Give me summary for${text} `,
                    },
                  ],
                },
              ],
            }),
          }
        );
        if (!aiRes.ok){
            const err = await aiRes.text();
            console.error("Google API error:", err);
            return res.status(500).json({ error: "Google API request failed" });
        }
        const data: CandidatesResponse = await aiRes.json();
        console.log(data.candidates[0]?.content.parts);
        res.send(data.candidates[0]?.content.parts)

    }catch(e){
         console.error("Unexpected error:", e);
         res.status(500).json({ error: "Failed to generate " });
    }


}