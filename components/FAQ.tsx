"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState, useRef } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  data?: FAQItem[];
}

export default function FAQ({ data = [] }: FAQProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs =
    data.length > 0
      ? data
      : [
          {
            id: "1",
            question: "Apakah KasirQ gratis? Berapa biayanya?",
            answer:
              "KasirQ menyediakan paket Starter yang gratis selamanya dengan fitur dasar. Untuk fitur yang lebih lengkap, kami menawarkan paket Professional seharga Rp 299.000/bulan dan paket Enterprise dengan harga yang disesuaikan kebutuhan.",
          },
          {
            id: "2",
            question: "Apakah data saya aman?",
            answer:
              "Tentu saja. Kami menggunakan enkripsi standar industri untuk melindungi data Anda. Data tersimpan di server cloud yang aman dan kami melakukan backup secara berkala.",
          },
          {
            id: "3",
            question: "Apakah bisa digunakan offline?",
            answer:
              "Ya, aplikasi mobile KasirQ dapat digunakan dalam mode offline. Data transaksi akan tersimpan di perangkat dan otomatis tersinkronisasi ke cloud saat perangkat kembali terhubung ke internet.",
          },
          {
            id: "4",
            question: "Platform apa saja yang didukung?",
            answer:
              "KasirQ tersedia sebagai aplikasi mobile untuk Android dan iOS, serta aplikasi web yang dapat diakses melalui browser di laptop atau tablet.",
          },
        ];

  return (
    <section id="faq" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-4xl relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pertanyaan <span className="gradient-text">Umum</span>
          </h2>
          <p className="text-lg text-gray-300">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  {openIndex === index ? (
                    <Minus size={16} className="text-white" />
                  ) : (
                    <Plus size={16} className="text-white" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 glass-dark rounded-xl p-8"
        >
          <p className="text-lg text-gray-300 mb-4">
            Masih ada pertanyaan lain?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Hubungi Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}
