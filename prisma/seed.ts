import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Budi Santoso",
        role: "Pemilik Cafe Kopi Senja",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        content:
          "Aplikasi KasirQ sangat membantu operasional cafe saya. Fitur sinkronisasi real-time nya juara! Sekarang saya bisa pantau omset dari rumah tanpa harus datang ke outlet.",
        rating: 5,
        order: 1,
      },
      {
        name: "Siti Aminah",
        role: "Owner Butik Muslimah",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        content:
          "Tampilan yang modern dan mudah digunakan bahkan untuk karyawan baru. Laporan keuangannya juga sangat lengkap dan mudah dipahami. Recommended banget!",
        rating: 5,
        order: 2,
      },
      {
        name: "Reza Pratama",
        role: "Manager Restoran Padang",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
        content:
          "Sejak pakai KasirQ, pencatatan stok jadi lebih rapi dan tidak ada lagi selisih uang kas. Customer supportnya juga sangat responsif membantu jika ada kendala.",
        rating: 4,
        order: 3,
      },
      {
        name: "Dewi Lestari",
        role: "Pemilik Toko Kelontong",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        content:
          "Sangat praktis bisa diakses lewat HP. Fitur offline mode-nya sangat membantu saat koneksi internet sedang tidak stabil. Maju terus KasirQ!",
        rating: 5,
        order: 4,
      },
    ],
  });

  // Seed Pricing Plans
  await prisma.pricingPlan.createMany({
    data: [
      {
        name: "Starter",
        price: "Gratis",
        period: "Selamanya",
        description: "Cocok untuk usaha rintisan yang baru mulai.",
        features: JSON.stringify([
          "1 User / Kasir",
          "Transaksi Unlimited",
          "Laporan Dasar",
          "Support Email",
        ]),
        ctaText: "Mulai Gratis",
        isPopular: false,
        order: 1,
      },
      {
        name: "Professional",
        price: "Rp 299.000",
        period: "/ bulan",
        description: "Untuk bisnis berkembang yang butuh fitur lengkap.",
        features: JSON.stringify([
          "5 User / Kasir",
          "Laporan Lengkap",
          "Manajemen Stok",
          "Multi Outlet (Max 3)",
          "Support Prioritas 24/7",
          "Integrasi Pembayaran",
        ]),
        ctaText: "Pilih Professional",
        isPopular: true,
        order: 2,
      },
      {
        name: "Enterprise",
        price: "Hubungi Kami",
        period: "",
        description: "Solusi kustom untuk bisnis skala besar.",
        features: JSON.stringify([
          "Unlimited User",
          "Unlimited Outlet",
          "API Access",
          "Dedicated Account Manager",
          "Custom Integrations",
          "On-site Training",
        ]),
        ctaText: "Hubungi Sales",
        isPopular: false,
        order: 3,
      },
    ],
  });

  // Seed FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: "Apakah KasirQ gratis? Berapa biayanya?",
        answer:
          "KasirQ menyediakan paket Starter yang gratis selamanya dengan fitur dasar. Untuk fitur yang lebih lengkap, kami menawarkan paket Professional seharga Rp 299.000/bulan dan paket Enterprise dengan harga yang disesuaikan kebutuhan.",
        order: 1,
      },
      {
        question: "Apakah data saya aman?",
        answer:
          "Tentu saja. Kami menggunakan enkripsi standar industri untuk melindungi data Anda. Data tersimpan di server cloud yang aman dan kami melakukan backup secara berkala.",
        order: 2,
      },
      {
        question: "Apakah bisa digunakan offline?",
        answer:
          "Ya, aplikasi mobile KasirQ dapat digunakan dalam mode offline. Data transaksi akan tersimpan di perangkat dan otomatis tersinkronisasi ke cloud saat perangkat kembali terhubung ke internet.",
        order: 3,
      },
      {
        question: "Platform apa saja yang didukung?",
        answer:
          "KasirQ tersedia sebagai aplikasi mobile untuk Android dan iOS, serta aplikasi web yang dapat diakses melalui browser di laptop atau tablet.",
        order: 4,
      },
      {
        question: "Apakah ada biaya setup atau instalasi?",
        answer:
          "Tidak ada biaya setup atau instalasi. Anda cukup mendaftar, download aplikasi, dan langsung bisa mulai berjualan.",
        order: 5,
      },
      {
        question: "Bagaimana jika saya ingin upgrade atau downgrade paket?",
        answer:
          "Anda dapat mengubah paket berlangganan kapan saja melalui dashboard admin. Perubahan akan berlaku efektif pada periode tagihan berikutnya.",
        order: 6,
      },
      {
        question: "Apakah tersedia customer support?",
        answer:
          "Ya, kami menyediakan layanan customer support melalui email dan chat. Untuk pengguna paket Professional dan Enterprise, tersedia layanan prioritas 24/7.",
        order: 7,
      },
      {
        question: "Apakah bisa integrasi dengan sistem lain?",
        answer:
          "Paket Enterprise mendukung akses API yang memungkinkan integrasi dengan sistem akuntansi, ERP, atau e-commerce lain yang Anda gunakan.",
        order: 8,
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
