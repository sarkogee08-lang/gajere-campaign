"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GalleryPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${image.name}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      alert("Image upload failed");
      setLoading(false);
      return;
    }

    // Get public image URL
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;


    // Save image details into gallery table
    const { error: dbError } = await supabase
      .from("gallery")
      .insert([
        {
          title,
          description,
          category,
          image_url: imageUrl,
        },
      ]);


    if (dbError) {
      console.error("Database Error:", dbError);
      alert("Failed to save gallery details");
      setLoading(false);
      return;
    }


    alert("Image uploaded successfully!");


    setTitle("");
    setDescription("");
    setCategory("");
    setImage(null);

    setLoading(false);
  }


  return (
    <div className="mx-auto max-w-4xl">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Gallery Upload
        </h1>

        <p className="mt-2 text-gray-500">
          Upload campaign photos and manage gallery content.
        </p>
      </div>


      <form
        onSubmit={handleUpload}
        className="space-y-6 rounded-2xl bg-white p-8 shadow-md"
      >

        <div>
          <label className="mb-2 block font-semibold">
            Image Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Community Visit"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>


        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this campaign moment..."
            rows={4}
            className="w-full rounded-lg border p-3"
          />
        </div>


        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Community, Youth, Agriculture..."
            className="w-full rounded-lg border p-3"
          />
        </div>


        <div>
          <label className="mb-2 block font-semibold">
            Select Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full"
            required
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

      </form>

    </div>
  );
}