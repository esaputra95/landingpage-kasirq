"use client";

import { useState } from "react";
import { Plus, Trash2, Check, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  image?: string | null;
  features: string[];
  ctaText: string;
  isPopular: boolean;
  order: number;
}

export default function PricingClient({
  initialData,
}: {
  initialData: PricingPlan[];
}) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    period: "/ bulan",
    description: "",
    image: "",
    features: "",
    ctaText: "Choose Plan",
    isPopular: false,
    order: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (item: PricingPlan) => {
    setFormData({
      name: item.name,
      price: item.price,
      period: item.period,
      description: item.description,
      image: item.image || "",
      features: item.features.join("\n"),
      ctaText: item.ctaText,
      isPopular: item.isPopular,
      order: item.order,
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Convert newline separated features to array
      const featuresArray = formData.features
        .split("\n")
        .filter((f) => f.trim() !== "");

      const url = editingId ? `/api/pricing/${editingId}` : "/api/pricing";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          features: featuresArray,
        }),
      });

      if (res.ok) {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
          name: "",
          price: "",
          period: "/ bulan",
          description: "",
          image: "", // Added image field
          features: "",
          ctaText: "Choose Plan",
          isPopular: false,
          order: 0,
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to save pricing plan", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const res = await fetch(`/api/pricing/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete pricing plan");
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
            price: "",
            period: "/ bulan",
            description: "",
            image: "", // Added image field
            features: "",
            ctaText: "Choose Plan",
            isPopular: false,
            order: 0,
          });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
      >
        <Plus size={20} />
        Add New Plan
      </button>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingId ? "Edit Pricing Plan" : "Add New Pricing Plan"}
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
              <label className="block text-sm text-gray-400 mb-1">
                Plan Name
              </label>
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
              <label className="block text-sm text-gray-400 mb-1">Price</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Period</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                CTA Text
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.ctaText}
                onChange={(e) =>
                  setFormData({ ...formData, ctaText: e.target.value })
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
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Image URL{" "}
                <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded bg-gray-700 border-gray-600"
                  checked={formData.isPopular}
                  onChange={(e) =>
                    setFormData({ ...formData, isPopular: e.target.checked })
                  }
                />
                <span className="text-white">Mark as Popular</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <input
              type="text"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">
              Features (One per line)
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
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
                ? "Update Plan"
                : "Save Plan"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialData.map((plan) => (
          <div
            key={plan.id}
            className={`bg-gray-800 p-6 rounded-xl border ${
              plan.isPopular ? "border-blue-500" : "border-gray-700"
            } relative`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {plan.image && (
              <div className="mb-4">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="mb-4">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center p-2 bg-gray-700 rounded-lg text-sm text-gray-300">
              CTA: {plan.ctaText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
