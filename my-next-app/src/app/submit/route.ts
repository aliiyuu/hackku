import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const age = formData.get('age') as string | null;
  const gender = formData.get('gender') as string | null;
  const genderIndentity = formData.get('genderIdentity') as string | null;
  const weight = formData.get('weight') as string | null;
  const height = formData.get('height') as string | null;
  const medicalConditions = formData.get('medicalConditions') as string | null;
  const medication = formData.get('medication') as string | null;
  const familyHistory = formData.get('familyHistory') as string | null;

  try {
    

        const formData = new FormData();
        formData.append(
          "content",
          `You are a preventative care assistant. Based on the patient’s information and their vaccination/medication history (attached), give concise, easy-to-read recommendations.
        
        Patient is ${age} years old, weighs ${weight} pounds, and is ${height} inches tall. Their assigned gender at birth is ${gender} and their gender identity is ${genderIndentity}. 
        They have the following medical conditions: ${medicalConditions || "None listed"}.
        Their family history includes: ${familyHistory || "None listed"}. They are currently taking the following medications in the respective doses: ${medication || "None listed"}
        
        Your task:
        - Give no more than **3 bullet points** for each category.
        - Use simple language and keep each bullet **short and actionable**.
        - Categories to include (if relevant): "Lifestyle Tips", "Vaccines to Get", "Screenings to Schedule"
        - Avoid long explanations or detailed medical advice.
        - Give actionable advice involving a specific timeframe or number of times weekly/monthly/etc.
        - Keep it friendly and supportive.
        - Do not add any bolding since the website will not show this, just make new lines for each category
        - also recommend hollistic care rituals such as meditation or spending time with family and friends 
        `
        );

        console.log('FormData:', formData);
        
        const response = await fetch("http://localhost:3000/gemini", {
            method: "POST",
            body: formData, 
        });

        const json = await response.json();
        console.log("Response from /gemini:", json);

        return NextResponse.json({ message: json.message }); // Ensure it's a string


  } catch (err) {
    console.error('Error reading results:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}