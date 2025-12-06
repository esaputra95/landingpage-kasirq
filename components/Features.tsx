"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  BarChart3,
  Users,
  Smartphone,
  Cloud,
  Lock,
  Zap,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Manajemen Penjualan",
    description:
      "Kelola transaksi penjualan dengan cepat dan mudah. Dukungan untuk berbagai metode pembayaran.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: BarChart3,
    title: "Laporan Real-time",
    description:
      "Dashboard analytics yang komprehensif dengan laporan penjualan, stok, dan keuntungan secara real-time.",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Users,
    title: "Manajemen Pelanggan",
    description:
      "Kelola data pelanggan, program loyalitas, dan history pembelian dalam satu platform.",
    color: "from-primary-600 to-secondary-500",
  },
  {
    icon: Smartphone,
    title: "Multi-Platform",
    description:
      "Akses dari mobile (iOS & Android) dan web browser. Data tersinkronisasi otomatis.",
    color: "from-success-500 to-success-600",
  },
  {
    icon: Cloud,
    title: "Cloud Backup",
    description:
      "Data Anda aman tersimpan di cloud dengan backup otomatis. Akses kapan saja dari mana saja.",
    color: "from-primary-500 to-secondary-600",
  },
  {
    icon: Lock,
    title: "Keamanan Terjamin",
    description:
      "Enkripsi end-to-end dan sistem keamanan berlapis untuk melindungi data bisnis Anda.",
    color: "from-secondary-600 to-primary-600",
  },
  {
    icon: Zap,
    title: "Performa Cepat",
    description:
      "Aplikasi yang dioptimalkan untuk performa maksimal. Transaksi dalam hitungan detik.",
    color: "from-primary-600 to-primary-700",
  },
  {
    icon: RefreshCw,
    title: "Update Otomatis",
    description:
      "Dapatkan fitur terbaru secara otomatis tanpa perlu install ulang aplikasi.",
    color: "from-secondary-500 to-secondary-700",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Fitur <span className="gradient-text">Unggulan</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk menjalankan bisnis modern dalam satu
            platform yang powerful dan mudah digunakan
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Coba Sekarang Gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
