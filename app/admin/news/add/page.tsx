"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AddNewsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");

  const [loading, setLoading] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);


    const { error } = await supabase
      .from("news")
      .insert([
        {
          title,
          summary,
          content,
          category,
          status,
        },
      ]);


    if (error) {
      console.error(error);
      alert("Failed to save news");
      setLoading(false);
      return;
    }


    alert("News added successfully!");

    router.push("/admin/news/manage");
  }



  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-8 text-4xl font-bold text-gray-900">
        Add News
      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >

        <input
          placeholder="News title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />


        <textarea
          placeholder="Short summary"
          value={summary}
          onChange={(e)=>setSummary(e.target.value)}
          className="w-full rounded-lg border p-3"
          rows={3}
          required
        />


        <textarea
          placeholder="Full news content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          className="w-full rounded-lg border p-3"
          rows={8}
          required
        />


        <input
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="w-full rounded-lg border p-3"
        />


        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="Draft">
            Draft
          </option>

          <option value="Published">
            Published
          </option>

        </select>


        <div className="flex gap-4">

          <button
            disabled={loading}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white"
          >
            {loading ? "Saving..." : "Save News"}
          </button>


          <Link
            href="/admin/news"
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </Link>

        </div>


      </form>

    </div>
  );
}