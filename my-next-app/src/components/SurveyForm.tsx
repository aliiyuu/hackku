"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 1. Define the shape of the form data
interface FormData {
  age: string;
  weight: string;
  height: string;
  medicalConditions: string;
  familyHistory: string;
  vaccinationFile: File | null;
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    weight: "",
    height: "",
    medicalConditions: "",
    familyHistory: "",
    vaccinationFile: null,
  });

  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  // 2. Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "vaccinationFile" && files) {
      setFormData((prev) => ({ ...prev, vaccinationFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit: Record<string, string> = {
      age: formData.age,
      weight: formData.weight,
      height: formData.height,
      medicalConditions: formData.medicalConditions,
      familyHistory: formData.familyHistory,
      vaccinationFile: formData.vaccinationFile?.name || "No file uploaded",
    };
    setSubmittedData(dataToSubmit);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold">Preventative Care Survey</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <Input
              name="weight"
              placeholder="Weight (kg or lbs)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <Input
              name="height"
              placeholder="Height (cm or ft/in)"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <Textarea
              name="medicalConditions"
              placeholder="List any existing medical conditions"
              value={formData.medicalConditions}
              onChange={handleChange}
            />
            <Textarea
              name="familyHistory"
              placeholder="Describe any relevant family medical history"
              value={formData.familyHistory}
              onChange={handleChange}
            />
            <div>
              <label className="block mb-1 font-medium">Vaccination History (PDF)</label>
              <Input
                type="file"
                name="vaccinationFile"
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
    </div>
  );
}
