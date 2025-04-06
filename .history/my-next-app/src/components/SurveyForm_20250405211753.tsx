"use client";

const formatRecommendations = (rawText: string) => {
  const sections = rawText.split(/\n(?=[A-Z][^\n]*\n\*)/g); // Splits on section titles followed by bullets

  return sections.map((section, index) => {
    const [titleLine, ...bodyLines] = section.trim().split("\n");
    const bullets = bodyLines.filter((line) => line.startsWith("*")).map((item) => item.replace("* ", ""));
    
    return (
      <div key={index} className="mb-4">
        <h4 className="text-lg font-semibold mb-1">{titleLine}</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  });
};

import React, { useEffect, useState } from "react";
import Select from "@/components/ClientSelect";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const medicalConditionsOptions = [
  { value: "hypertension", label: "Hypertension (High blood pressure)" },
  { value: "diabetes", label: "Diabetes (Type 1 or 2)" },
  { value: "asthma", label: "Asthma" },
  { value: "depression", label: "Depression" },
  { value: "anxiety", label: "Anxiety Disorders" },
  { value: "arthritis", label: "Arthritis" },
  { value: "thyroid", label: "Thyroid Disorders" },
  { value: "allergies", label: "Severe Allergies" },
  { value: "hiv", label: "HIV/AIDS" },
  { value: "none", label: "None" },
  { value: "high-cholesterol", label: "High Cholesterol" },
  { value: "epilepsy", label: "Epilepsy" },
  { value: "cancer", label: "Cancer" },
  { value: "obesity", label: "Obesity" },
  { value: "osteoporosis", label: "Osteoporosis" },
  { value: "hepatitis", label: "Hepatitis (Type B or C)" },
  { value: "migraines", label: "Chronic Migraines" },
  { value: "sleep-apnea", label: "Sleep Apnea" },
];
const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: " Male" }
];

interface Data {
  age: number;
  gender: string;
  genderIdentity: string;
  weight: number;
  height: number;
  medicalConditions: { value: string; label: string }[];
  familyHistory: string;
  file: File | null;
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<Data>({
    age: -1,
    gender: "",
    genderIdentity: "",
    weight: -1,
    height: -1,
    medicalConditions: [],
    familyHistory: "",
    file: null,
  });

  const [recommendations, setRecommendations] = useState<string | null>(null);

  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    console.log("Updated recommendations:", recommendations);
  }, [recommendations]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "file" && files) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selected: any) => {
    setFormData((prev) => ({ ...prev, medicalConditions: selected }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      medicalConditions: formData.medicalConditions.map((cond) => cond.label),
      file: formData.file?.name || "No file uploaded",
    };
    setSubmittedData(dataToSubmit);
   // formData.append('file', formData.file);
    const submittedForm = new FormData();
    submittedForm.append('age', String(formData.age));
    submittedForm.append('gender', String(formData.gender));
    submittedForm.append('genderIdentity', String(formData.genderIdentity));
    submittedForm.append('weight', String(formData.weight));
    submittedForm.append('height', String(formData.height));
    submittedForm.append('medicalConditions', JSON.stringify(formData.medicalConditions));
    submittedForm.append('familyHistory', formData.familyHistory);
    submittedForm.append('file', formData.file as Blob);

    const response = await fetch('http://localhost:3000/submit', 
    {
        method: 'POST',
        body: submittedForm
    });

    if (!response.ok) {
      alert('Something went wrong with the API');
      return;
    }
    
    const jsonResponse = await response.json();
    console.log("API response:", jsonResponse);
    
    // ✅ Set the actual recommendation text from response
    setRecommendations(jsonResponse.message || "No recommendations returned.");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold">Preventative Care Survey</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor = "age" className = "block mb-1 font-medium" >Age</label>
                <Input
                  name="age"
                  placeholder="years"
                  value={formData.age > -1 ? String(formData.age) : ""}
                  onChange={handleChange}
                  required
                />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Sex Assigned at Birth</label>
              <Select
                name="gender"
                options={genderOptions}
                value={genderOptions.find((opt) => opt.value === formData.gender)}
                onChange={(selected: any) =>
                  setFormData((prev) => ({ ...prev, gender: selected.value }))
                }
                className="text-sm"
              />
            </div>

            <div>
            <label className="block mb-1 font-medium">Gender Identity</label>

              <Input
                name="genderIdentity"
                placeholder="please specify your gender identity"
                value={formData.genderIdentity}
                onChange={handleChange}
        
              />
            </div>

            <div>
            <label className="block mb-1 font-medium">Weight</label>
              <Input
                name="weight"
                placeholder="pounds"
                value={formData.weight > -1 ? String(formData.weight) : ""}
                onChange={handleChange}
                required
              />
            </div>

            <div>
            <label className="block mb-1 font-medium">Height</label>

              <Input
                name="height"
                placeholder="inches"
                value={formData.height > -1 ? String(formData.height) : ""}
                onChange={handleChange}
                required
              />
            </div>


            <div>
              <label className="block mb-1 font-medium">Existing Medical Conditions</label>
              <Select
                isMulti
                name="medicalConditions"
                options={medicalConditionsOptions}
                value={formData.medicalConditions}
                onChange={handleSelectChange}
                className="text-sm"
              />
            </div>

            <div>
            <label className="block mb-1 font-medium">Relevant Medical History</label>

              <Textarea
                name="familyHistory"
                placeholder="Further specity conditions and describe any relevant family medical history"
                value={formData.familyHistory}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Vaccination/Medication History (PDF)</label>
              <Input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>

          {submittedData && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Submitted Data (JSON)</h3>
              <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-x-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )} 
        </CardContent>
      </Card>
      
        <div className="mt-6">
        {(recommendations != null ? <h3 className="text-xl font-semibold">Recommendations</h3> : <h3 className="text-xl font-semibold"></h3>)}
        {recommendations && (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
    {formatRecommendations(recommendations)}
  </div>
)}
        </div>
  
    </div>
  );
}
