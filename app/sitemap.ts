import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti dengan domain aslimu
  const baseUrl = "https://kasirq.id";

  return [
    {
      url: baseUrl, // Halaman Utama
      lastModified: new Date(),
      changeFrequency: "monthly", // Karena landing page jarang berubah tiap jam
      priority: 1, // Prioritas tertinggi
    },
  ];
}
