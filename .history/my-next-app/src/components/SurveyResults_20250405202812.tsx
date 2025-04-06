"use client";

import React, { useEffect, useState } from "react";

export default function SurveyResults() {
  const [data, setData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("surveyData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Survey Results</h1>
      {data ? (
        <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
}