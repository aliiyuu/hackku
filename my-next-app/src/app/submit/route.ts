import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const age = formData.get('age') as string | null;
  const weight = formData.get('weight') as string | null;
  const height = formData.get('height') as string | null;
  const medicalConditions = formData.get('medicalConditions') as string | null;
  const familyHistory = formData.get('familyHistory') as string | null;
  const file = formData.get('file') as File | null;

  console.log('File:', file);

  if (!file) {
    return NextResponse.json({ error: 'No file available' }, { status: 400 });
  }

  try {
    

        const formData = new FormData();
        formData.append("content", `This patient is ${age} years old, weighs ${weight} kg, and is ${height} cm tall. They have the following medical conditions: ${medicalConditions}. Their family history includes: ${familyHistory}. Their vaccination and medication history is given below.`);
        formData.append("file", file); // file from input[type=file]

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