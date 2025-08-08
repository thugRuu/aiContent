import { Request,Response } from "express";
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({});

export const getAiContent = async (req:Request,res:Response)=>{
    const {text}  = req.body;
    console.log("body",text)

    if (!text) {
        return res.json({ error: "Text is required" });
    }

    try{
        const apiKey = "AIzaSyDv_EE5N83f9w9vvoISs8RBOB29JYkxX_g";
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
              prompt: {
                text: `Summarize this text briefly:\n\n${text}`,
              },
              temperature: 0.5,
              maxOutputTokens: 150,
            }),
          }
        );
        if (!aiRes.ok){
            const err = await aiRes.text();
            console.error("Google API error:", err);
            return res.status(500).json({ error: "Google API request failed" });
        }
        const data = await aiRes.json();
        console.log(data)
        res.send(data)

    }catch(e){
         console.error("Unexpected error:", e);
         res.status(500).json({ error: "Failed to generate " });
    }


}