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
        formData.append(
          "content",
          `You are a preventative care assistant. Based on the patient information and vaccination/medication history provided below, suggest any recommended changes, follow-up screenings, vaccines, or check-ups this patient may need.
          
        Patient is ${age} years old, weighs ${weight} kg, and is ${height} inches tall. 
        They have the following medical conditions: ${medicalConditions || "None listed"}.
        Their family history includes: ${familyHistory || "None listed"}.
        
        Use this information to recommend some easy to implement healthy life style changes, or vaccinations recommended for the patient to get 
        suggestions may include, 'go on a walk for 30 minutes every day' or 'include more protein into your diet' based on the patients medical history and age 
        categorize your suggestions and make them easy to read. you do not need to give very specific or deeply medical suggestions, just things that are easy to do or vaccines/medications that are easy to get`
        );
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