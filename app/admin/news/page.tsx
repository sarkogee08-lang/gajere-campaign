"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";


type NewsItem = {
  id: number;
  title: string;
  summary: string;
  category: string;
  status: string;
  created_at: string;
};


export default function NewsPage() {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", {
        ascending: false,
      });


    if (error) {
      console.error("News Fetch Error:", error);
      setLoading(false);
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
      console.error("Delete Error:", error);
      alert("Unable to delete news");
      return;
    }


    alert("News deleted successfully");

    fetchNews();

  }



  const filteredNews = news.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (

    <div className="space-y-8">


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            News Management
          </h1>

          <p className="mt-2 text-gray-600">
            Create and manage campaign news articles.
          </p>

        </div>


        <Link
          href="/admin/news/add"
          className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >

          <Plus size={20} />

          Add News

        </Link>


      </div>



      <div className="relative max-w-md">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />


        <input

          type="text"

          placeholder="Search news..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="w-full rounded-xl border p-3 pl-11"

        />

      </div>



      {loading && (

        <p className="text-gray-500">
          Loading news...
        </p>

      )}




      {!loading && filteredNews.length === 0 && (

        <div className="rounded-xl bg-white p-8 text-center shadow">

          <p className="text-gray-500">
            No news articles available.
          </p>

        </div>

      )}




      <div className="grid gap-6 md:grid-cols-3">


        {filteredNews.map((item)=>(


          <div
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow"
          >


            <span className="text-sm font-semibold text-gray-500">
              {item.category}
            </span>



            <h2 className="mt-3 text-2xl font-bold text-green-700">

              {item.title}

            </h2>



            <p className="mt-3 text-gray-600">

              {item.summary}

            </p>




            <div className="mt-5 flex items-center justify-between">


              <div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                  {item.status}

                </span>


                <p className="mt-3 text-sm text-gray-400">

                  {new Date(item.created_at)
                    .toLocaleDateString()}

                </p>


              </div>




              <button

                onClick={() => deleteNews(item.id)}

                className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"

              >

                <Trash2 size={18}/>

              </button>



            </div>


          </div>


        ))}


      </div>


    </div>

  );

}