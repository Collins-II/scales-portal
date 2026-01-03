"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";

type CategoryFormProps = {
  initialData?: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parent?: string | null;
  };
  parentId?: string | null;
};

export default function CategoryForm({
  initialData,
  parentId = null,
}: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [loading, setLoading] = useState(false);

  /* 🔹 Auto-generate slug from name (create mode only) */
  useEffect(() => {
    if (!initialData) {
      setSlug(slugify(name));
    }
  }, [name, initialData]);

  const submit = async () => {
    if (!name.trim()) return alert("Category name is required");

    setLoading(true);

    const res = await fetch(
      initialData
        ? `/api/categories/${initialData._id}`
        : "/api/categories",
      {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          description,
          parent: parentId,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save category");
      return;
    }

    alert(initialData ? "Category updated" : "Category created");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-black text-xl font-semibold">
        {initialData ? "Edit Category" : "Create Category"}
      </h1>

      <input
        placeholder="Category name"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Slug"
        className="input"
        value={slug}
        onChange={(e) => setSlug(slugify(e.target.value))}
      />

      <textarea
        placeholder="Description (optional)"
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={submit}
        className="btn-primary"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </div>
  );
}
