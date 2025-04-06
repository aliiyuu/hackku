import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import 'dotenv/config';

export async function POST(req: NextRequest){
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const request = await req.formData(); // Parse JSON body
    console.log('Request:', request);

    try {
        const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: request.get("content") as string,
        });
       // console.log(response.text);
        
        return NextResponse.json({ message: response.text });

        
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}