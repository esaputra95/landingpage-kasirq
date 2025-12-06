"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
}

export default function FAQClient({ initialData }: { initialData: FAQ[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (item: FAQ) => {
    setFormData({
      question: item.question,
      answer: item.answer,
      order: item.order,
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ question: "", answer: "", order: 0 });
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to save FAQ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete FAQ");
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
          setFormData({ question: "", answer: "", order: 0 });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
      >
        <Plus size={20} />
        Add New FAQ
      </button>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingId ? "Edit FAQ" : "Add New FAQ"}
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

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Question</label>
            <input
              type="text"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Answer</label>
            <textarea
              required
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
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
              {isLoading ? "Saving..." : editingId ? "Update FAQ" : "Save FAQ"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {initialData.map((faq) => (
          <div
            key={faq.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() =>
                setExpandedId(expandedId === faq.id ? null : faq.id)
              }
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-2 bg-gray-700 rounded-lg cursor-move"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical size={20} className="text-gray-400" />
                </div>
                <h3 className="font-medium pr-8">{faq.question}</h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(faq);
                  }}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(faq.id);
                  }}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                {expandedId === faq.id ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </div>

            {expandedId === faq.id && (
              <div className="px-4 pb-4 pt-0 pl-16 text-gray-400 border-t border-gray-700/50 mt-2 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
