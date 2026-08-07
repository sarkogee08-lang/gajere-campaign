"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
};

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gallery Error:", error);
        setLoading(false);
        return;
      }

      setGallery(data || []);
      setLoading(false);
    }

    fetchGallery();
  }, []);


  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-white py-24"
    >

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Campaign Gallery
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Moments from the Campaign
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Highlights of our journey across Kebbi South, meeting people,
            listening to communities, and building a shared vision for the future.
          </p>

        </div>


        {loading && (
          <div className="mt-16 text-center text-gray-500">
            Loading gallery...
          </div>
        )}


        {!loading && gallery.length === 0 && (
          <div className="mt-16 text-center text-gray-500">
            No gallery images available yet.
          </div>
        )}


        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {gallery.map((item) => (

            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative h-64 w-full overflow-hidden bg-gray-200">

                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/30" />

              </div>


              <div className="p-6">

                <span className="text-sm font-semibold text-gray-500">
                  {item.category}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-green-700">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>

              </div>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}