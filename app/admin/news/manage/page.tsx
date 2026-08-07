"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  status: string;
  created_at: string;
};

export default function NewsManagePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);


  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("News Error:", error);
      return;
    }

    setNews(data || []);
    setLoading(false);
  }


  useEffect(() => {
    fetchNews();
  }, []);



  async function deleteNews(id: number) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this news article?"
    );

    if (!confirmDelete) return;


    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);


    if (error) {
      console.error(error);
      alert("Failed to delete news");
      return;
    }


    alert("News deleted successfully");

    fetchNews();
  }



  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-900">
          News Management
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage campaign news articles.
        </p>

      </div>



      {loading && (
        <p className="text-gray-500">
          Loading news...
        </p>
      )}



      <div className="grid gap-8 md:grid-cols-3">

        {news.map((item) => (

          <div
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow"
          >

            <span className="text-sm font-semibold text-gray-500">
              {item.category}
            </span>


            <h2 className="mt-2 text-2xl font-bold text-green-700">
              {item.title}
            </h2>


            <p className="mt-3 text-gray-600">
              {item.summary}
            </p>


            <div className="mt-4 flex items-center justify-between">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                {item.status}
              </span>


              <button
                onClick={() => deleteNews(item.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>


          </div>

        ))}

      </div>

    </div>
  );
}