"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditGalleryPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadGalleryItem() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gallery Load Error:", error);
        alert("Unable to load gallery image.");
        router.push("/admin/gallery");
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setImageUrl(data.image_url || "");
      setLoading(false);
    }

    if (id) {
      loadGalleryItem();
    }
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an image title.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("gallery")
      .update({
        title: title.trim(),
        description: description.trim() || null,
        category: category.trim() || null,
      })
      .eq("id", id);

    if (error) {
      console.error("Gallery Update Error:", error);
      alert("Failed to update gallery image.");
      setSaving(false);
      return;
    }

    alert("Gallery image updated successfully.");
    router.push("/admin/gallery");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">
        <p className="text-gray-500">Loading gallery image...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Edit Gallery Image
        </h1>

        <p className="mt-2 text-gray-500">
          Update the title, description or category of this campaign image.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow md:p-8">
        {imageUrl && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={imageUrl}
              alt={title || "Gallery image"}
              className="h-72 w-full object-cover"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Community Engagement in Zuru"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Community, Youth, Agriculture..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the campaign moment..."
              rows={6}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/gallery")}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}