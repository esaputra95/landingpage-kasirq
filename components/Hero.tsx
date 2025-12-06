"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Globe } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[float_8s_ease-in-out_infinite_2s]"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[float_7s_ease-in-out_infinite_1s]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300">
                🚀 Platform POS Terdepan
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Kelola Bisnis Anda{" "}
              <span className="gradient-text">Dimana Saja, </span>
              <span className="gradient-text">Kapan Saja</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Aplikasi POS digital yang dapat diakses melalui{" "}
              <span className="text-primary-400 font-semibold">mobile</span> dan{" "}
              <span className="text-secondary-400 font-semibold">web</span>{" "}
              secara bersamaan dengan data tersinkronisasi real-time.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-primary-500/50 transition-shadow"
              >
                Mulai Gratis
                <ArrowRight size={20} />
              </motion.a>

              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border border-primary-500/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Lihat Demo
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Smartphone className="text-primary-400" size={24} />
                <div>
                  <p className="text-2xl font-bold">Android</p>
                  <p className="text-sm text-gray-400">Mobile App</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-secondary-400" size={24} />
                <div>
                  <p className="text-2xl font-bold">Web App</p>
                  <p className="text-sm text-gray-400">Akses Browser</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative glass-dark rounded-2xl p-2 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <Image
                src="/images/pos-dashboard.jpg"
                alt="KasirQ Dashboard Preview"
                width={600}
                height={800}
                className="rounded-xl w-full h-auto"
                priority
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-600/20 to-secondary-600/20 pointer-events-none"></div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 glass px-4 py-3 rounded-xl shadow-lg"
            >
              <p className="text-sm text-gray-300">✅ Sync Real-time</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 glass px-4 py-3 rounded-xl shadow-lg"
            >
              <p className="text-sm text-gray-300">📱 Multi-Platform</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
