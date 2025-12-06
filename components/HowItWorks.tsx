"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download & Daftar",
    description:
      "Download aplikasi dari Play Store / App Store atau akses via web. Daftar akun gratis dalam 2 menit.",
    color: "from-primary-500 to-primary-600",
  },
  {
    number: "02",
    icon: Settings,
    title: "Setup Mudah",
    description:
      "Tambahkan produk, atur kategori, dan konfigurasi toko Anda dengan panduan step-by-step yang mudah.",
    color: "from-primary-600 to-secondary-500",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Mulai Jualan",
    description:
      "Transaksi pertama Anda siap dilakukan! Pantau penjualan dan kelola bisnis dari mana saja.",
    color: "from-secondary-500 to-secondary-600",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cara <span className="gradient-text">Kerja</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Mulai gunakan KasirQ hanya dalam 3 langkah mudah
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-secondary-500/50"></div>
              )}

              <div className="glass rounded-2xl p-8 text-center relative z-10 hover:scale-105 transition-transform duration-300">
                {/* Step Number */}
                <div
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 mt-4`}
                >
                  <step.icon size={36} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Siap untuk memulai perjalanan bisnis yang lebih baik?
          </p>
          <a
            href="#pricing"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Lihat Paket Harga
          </a>
        </motion.div>
      </div>
    </section>
  );
}
