"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AddGalleryPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
      return;
    }

    if (!file) {
      setErrorMessage("Please select an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be 5MB or less.");
      return;
    }

    setUploading(true);

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${fileExtension}`;

      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        setErrorMessage(
          `Image upload failed: ${uploadError.message}`
        );
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: databaseError } = await supabase
        .from("gallery")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          image_url: imageUrl,
          category: category.trim() || null,
        });

      if (databaseError) {
        console.error("Database Error:", databaseError);

        await supabase.storage
          .from("gallery")
          .remove([filePath]);

        setErrorMessage(
          `Gallery record could not be saved: ${databaseError.message}`
        );

        setUploading(false);
        return;
      }

      alert("Gallery image uploaded successfully.");

      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
      console.error("Unexpected Upload Error:", error);
      setErrorMessage(
        "Something went wrong while uploading the image."
      );
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/gallery"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          title="Back to gallery"
        >
          <ArrowLeft size={22} />
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Add Gallery Image
          </h1>

          <p className="mt-2 text-gray-500">
            Upload a campaign image to the gallery.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-8 shadow"
      >
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Image Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Community Engagement in Zuru"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Community, Youth, Agriculture..."
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe this campaign moment..."
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Campaign Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                setFile(selectedFile);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm"
            />

            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG, WEBP and other common image formats. Maximum size: 5MB.
            </p>
          </div>

          {file && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-700">
                Selected file
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {file.name}
              </p>

              <p className="text-xs text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/gallery"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
