"use client";

import { useState } from "react";
import { Plus, Trash2, Star, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  isActive: boolean;
  order: number;
}

export default function TestimonialClient({
  initialData,
}: {
  initialData: Testimonial[];
}) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    avatar: "",
    content: "",
    rating: 5,
    order: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (item: Testimonial) => {
    setFormData({
      name: item.name,
      role: item.role,
      avatar: item.avatar,
      content: item.content,
      rating: item.rating,
      order: item.order,
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editingId
        ? `/api/testimonials/${editingId}`
        : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";

      // Use provided avatar or generate one based on name
      const avatarToUse =
        formData.avatar.trim() ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name
        )}&background=random`;

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          avatar: avatarToUse,
        }),
      });
      if (res.ok) {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
          name: "",
          role: "",
          avatar: "",
          content: "",
          rating: 5,
          order: 0,
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to save testimonial", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Failed to delete", error);
      alert("An error occurred while deleting");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsAdding(!isAdding);
          setEditingId(null);
          setFormData({
            name: "",
            role: "",
            avatar: "",
            content: "",
            rating: 5,
            order: 0,
          });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
      >
        <Plus size={20} />
        Add New Testimonial
      </button>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Avatar URL{" "}
                <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                placeholder="Leave empty for default avatar"
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Order</label>
              <input
                type="number"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Content</label>
            <textarea
              required
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : editingId
                ? "Update Testimonial"
                : "Save Testimonial"}
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {initialData.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-lg cursor-move">
                <GripVertical size={20} className="text-gray-400" />
              </div>
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>{item.rating}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
