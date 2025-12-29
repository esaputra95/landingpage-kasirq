import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Berlaku untuk semua bot (Google, Bing, dll)
      allow: "/", // Izinkan baca semua halaman
      disallow: "/admin/", // (Opsional) Larang bot masuk halaman admin/privat
    },
    sitemap: "https://kasirq.id/sitemap.xml", // Memberitahu bot lokasi peta situs
  };
}
