"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
};

export default function GalleryManagePage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);


  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error(error);
      return;
    }

    setGallery(data || []);
    setLoading(false);
  }


  useEffect(() => {
    fetchGallery();
  }, []);



  async function deleteImage(item: GalleryItem) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;


    const fileName = item.image_url.split("/").pop();


    if (fileName) {
      await supabase.storage
        .from("gallery")
        .remove([fileName]);
    }


    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", item.id);


    if (error) {
      console.error(error);
      alert("Failed to delete image");
      return;
    }


    alert("Image deleted successfully");

    fetchGallery();
  }



  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-900">
          Gallery Management
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage campaign photos.
        </p>

      </div>


      {loading && (
        <p className="text-gray-500">
          Loading gallery...
        </p>
      )}


      <div className="grid gap-8 md:grid-cols-3">


        {gallery.map((item) => (

          <div
            key={item.id}
            className="overflow-hidden rounded-2xl bg-white shadow"
          >

            <div className="relative h-56">

              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />

            </div>


            <div className="p-5">

              <h2 className="text-xl font-bold text-green-700">
                {item.title}
              </h2>


              <p className="mt-2 text-sm text-gray-600">
                {item.category}
              </p>


              <button
                onClick={() => deleteImage(item)}
                className="mt-5 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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