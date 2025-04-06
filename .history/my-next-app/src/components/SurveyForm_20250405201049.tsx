"use client";

import React, { useState } from "react";
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

interface FormData {
  age: string;
  weight: string;
  height: string;
  medicalConditions: { value: string; label: string }[];
  familyHistory: string;
  vaccinationFile: File | null;
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    weight: "",
    height: "",
    medicalConditions: [],
    familyHistory: "",
    vaccinationFile: null,
  });

  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "vaccinationFile" && files) {
      setFormData((prev) => ({ ...prev, vaccinationFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selected: any) => {
    setFormData((prev) => ({ ...prev, medicalConditions: selected }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      medicalConditions: formData.medicalConditions.map((cond) => cond.label),
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
            <Textarea
              name="familyHistory"
              placeholder="Further specity conditions and describe any relevant family medical history"
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
