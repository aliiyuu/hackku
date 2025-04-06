"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailCapturePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/save-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      router.push("/survey"); // Redirect to the survey page
    } else {
      alert("There was an error saving your email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Welcome! 👋</h2>
      <p className="mb-4">Please enter your email to begin the preventative care survey.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Continue to Survey</Button>
      </form>
    </div>
  );
}