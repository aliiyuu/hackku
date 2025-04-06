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
  const location = formData.get('location') as string | null;

  try {
    

        const formData = new FormData();
        formData.append(
          "content",
          `You are a preventative care assistant and you are talking to the patient.
        
        Patient is ${age} years old, weighs ${weight} pounds, and is ${height} inches tall. Their assigned gender at birth is ${gender} and their gender identity is ${genderIndentity}. 
        They have the following medical conditions: ${medicalConditions || "None listed"}.
        Their family history includes: ${familyHistory || "None listed"}. They are currently taking the following medications in the respective doses: ${medication || "None listed"}

        The person lives in ${location || "No location provided"}.
        
        Based on the patient’s information and medication history, give concise, easy-to-read group activity recommendations for a group of 4 people with similar age, location, and condition, in order to both improve each participant's health and enhance a sense of community.
        Please list a maximum of 5 activities, including very short itinerary or plan. Formatted with new lines but not bullet points.
        At the very end, please create links to contact the other group mates that are matched with the patient.
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