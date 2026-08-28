"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Image as ImageIcon, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  created_at: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGallery() {
    setLoading(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery Error:", error);
      setLoading(false);
      return;
    }

    setGallery((data as GalleryItem[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadGallery();
  }, []);

  async function deleteGalleryItem(item: GalleryItem) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${item.title}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log("Gallery Delete Auth User:", user);
    console.log("Gallery Delete Auth Error:", authError);

    if (!user) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    const imageUrl = item.image_url;

    // Extract the storage path from the public Supabase URL.
    const marker = "/storage/v1/object/public/gallery/";

    let storagePath = "";

    if (imageUrl.includes(marker)) {
      storagePath = decodeURIComponent(
        imageUrl.split(marker)[1]
      );
    }

    // Delete the database record first.
    const { data: deletedRows, error: databaseError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", item.id)
      .select();

    console.log("Gallery Delete ID:", item.id);
    console.log("Gallery Delete Result:", deletedRows);
    console.log("Gallery Database Delete Error:", databaseError);

    if (databaseError) {
      console.error("Gallery Database Delete Error:", databaseError);
      alert("Failed to delete gallery image from the database.");
      return;
    }

    // Delete the corresponding file from Supabase Storage.
    if (storagePath) {
      console.log("Gallery Storage Path:", storagePath);

      const { data: storageData, error: storageError } =
        await supabase.storage
          .from("gallery")
          .remove([storagePath]);

      console.log("Gallery Storage Delete Result:", {
        storageData,
        storageError,
      });

      if (storageError) {
        console.error("Gallery Storage Delete Error:", storageError);

        alert(
          "Storage deletion failed: " +
          (storageError.message || "Unknown Storage error")
        );

        return;
      }
    }

    setGallery((currentGallery) =>
      currentGallery.filter((galleryItem) => galleryItem.id !== item.id)
    );

    alert("Gallery image deleted successfully.");
  } catch (error) {
    console.error("Gallery Delete Error:", error);
    alert("An unexpected error occurred while deleting the gallery image.");
  }
}

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="mt-2 text-gray-500">
            Upload, manage and remove campaign gallery images.
          </p>
        </div>

        <Link
          href="/admin/gallery/add"
          className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          <Plus size={20} />
          Add Image
        </Link>
      </div>

      {loading && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <p className="text-gray-500">
            Loading gallery...
          </p>
        </div>
      )}

      {!loading && gallery.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <ImageIcon size={30} className="text-green-700" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            No gallery images
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-gray-500">
            You have not uploaded any campaign gallery images yet.
          </p>

          <Link
            href="/admin/gallery/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Plus size={20} />
            Upload First Image
          </Link>
        </div>
      )}

      {!loading && gallery.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <div className="relative h-56 w-full bg-gray-200">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-green-700">
                      {item.category || "General"}
                    </p>
                  </div>

                  <Link
                    href={"/admin/gallery/edit/" + item.id}
                    className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 hover:text-green-800"
                    title="Edit image"
                  >
                    <Pencil size={20} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteGalleryItem(item)}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800"
                    title="Delete image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {item.description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}







