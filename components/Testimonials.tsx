"use client";

import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  data?: Testimonial[];
}

export default function Testimonials({ data = [] }: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials =
    data.length > 0
      ? data
      : [
          {
            id: "1",
            name: "Budi Santoso",
            role: "Pemilik Cafe Kopi Senja",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            content:
              "Aplikasi KasirQ sangat membantu operasional cafe saya. Fitur sinkronisasi real-time nya juara! Sekarang saya bisa pantau omset dari rumah tanpa harus datang ke outlet.",
            rating: 5,
          },
          {
            id: "2",
            name: "Siti Aminah",
            role: "Owner Cafe & Resto",
            avatar: "https://i.pravatar.cc/150?img=45",
            content:
              "Fitur multi-platform sangat membantu. Staff bisa pakai dari HP, saya bisa monitor dari laptop. Data selalu sinkron real-time!",
            rating: 5,
          },
          {
            id: "3",
            name: "Andi Wijaya",
            role: "Manager Minimarket",
            avatar: "https://i.pravatar.cc/150?img=33",
            content:
              "Laporan yang detail dan mudah dipahami. Sekarang saya bisa buat keputusan bisnis lebih cepat berdasarkan data yang akurat.",
            rating: 5,
          },
          {
            id: "4",
            name: "Dewi Lestari",
            role: "Pemilik Warung Kelontong",
            avatar: "https://i.pravatar.cc/150?img=47",
            content:
              "Sebagai pemilik usaha kecil, KasirQ sangat mudah digunakan dan harganya terjangkau. Highly recommended!",
            rating: 5,
          },
        ];

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kata <span className="gradient-text">Mereka</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Dipercaya oleh ribuan pemilik bisnis di seluruh Indonesia
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass rounded-2xl p-6 relative hover:scale-105 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <Quote
                className="absolute top-4 right-4 text-primary-500 opacity-20"
                size={40}
              />

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                {testimonial.content}
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              10,000+
            </p>
            <p className="text-gray-300">Pengguna Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              50M+
            </p>
            <p className="text-gray-300">Transaksi Diproses</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              4.9/5
            </p>
            <p className="text-gray-300">Rating Pengguna</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
