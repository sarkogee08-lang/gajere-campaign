"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type NewsItem = {
  id: number;
  title: string;
  summary: string;
  category: string;
  created_at: string;
};



export default function News() {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function fetchNews() {

      const { data, error } = await supabase
        .from("news")
        .select(
          "id,title,summary,category,created_at"
        )
        .eq("status", "Published")
        .order("created_at", {
          ascending: false,
        })
        .limit(3);



      if (error) {

        console.error(
          "News Loading Error:",
          error
        );

        setLoading(false);
        return;

      }



      setNews(data || []);

      setLoading(false);

    }


    fetchNews();


  }, []);




  return (

    <section id="news" className="bg-gray-50 py-24">

      <div className="mx-auto max-w-7xl px-6">


        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            Latest News

          </span>


          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">

            Campaign News & Updates

          </h2>


          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">

            Stay informed with the latest campaign activities,
            community engagements, and development initiatives.

          </p>


        </div>




        {loading && (

          <p className="mt-16 text-center text-gray-500">

            Loading news...

          </p>

        )}






        {!loading && news.length === 0 && (

          <p className="mt-16 text-center text-gray-500">

            No published news available yet.

          </p>

        )}






        <div className="mt-16 grid gap-8 md:grid-cols-3">


          {news.map((item)=>(


            <div

              key={item.id}

              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

            >


              <div className="flex h-56 items-center justify-center bg-green-700 text-6xl">

                📰

              </div>




              <div className="p-6">


                <p className="text-sm font-semibold text-green-700">

                  {new Date(item.created_at)
                    .toLocaleDateString(
                      "en-US",
                      {
                        month:"long",
                        year:"numeric",
                      }
                    )}

                </p>




                <h3 className="mt-3 text-2xl font-bold text-gray-900">

                  {item.title}

                </h3>




                <p className="mt-4 leading-7 text-gray-600">

                  {item.summary}

                </p>




                <button className="mt-6 font-semibold text-green-700 hover:text-green-900">

                  Read More →

                </button>



              </div>


            </div>


          ))}


        </div>


      </div>


    </section>

  );

}