"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap } from "lucide-react";

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
}

interface PricingProps {
  data?: PricingPlan[];
}

export default function Pricing({ data }: PricingProps) {
  const plans =
    data && data.length > 0
      ? data
      : [
          {
            id: "1",
            name: "Starter",
            price: "Gratis",
            period: "Selamanya",
            description: "Cocok untuk usaha rintisan yang baru mulai.",
            features: [
              "1 User / Kasir",
              "Transaksi Unlimited",
              "Laporan Dasar",
              "Support Email",
            ],
            ctaText: "Mulai Gratis",
            isPopular: false,
          },
          {
            id: "2",
            name: "Professional",
            price: "299K",
            period: "/bulan",
            description: "Untuk bisnis yang berkembang",
            features: [
              "5 Pengguna",
              "Transaksi unlimited",
              "Laporan lengkap & export",
              "Cloud storage 10GB",
              "Multi-lokasi (3 toko)",
              "Support prioritas",
              "Integrasi pembayaran",
            ],
            ctaText: "Pilih Professional",
            isPopular: true,
          },
          {
            id: "3",
            name: "Enterprise",
            price: "Custom",
            period: "Hubungi kami",
            description: "Untuk bisnis skala besar",
            features: [
              "Unlimited pengguna",
              "Transaksi unlimited",
              "Advanced analytics & BI",
              "Cloud storage unlimited",
              "Multi-lokasi unlimited",
              "Dedicated support 24/7",
              "Custom integration",
              "Training & onboarding",
            ],
            ctaText: "Hubungi Sales",
            isPopular: false,
          },
        ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Paket <span className="gradient-text">Harga</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Upgrade atau
            downgrade kapan saja.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.isPopular
                  ? "glass-dark border-2 border-primary-500 scale-105 shadow-2xl shadow-primary-500/20"
                  : "glass"
              } hover:scale-105 transition-transform duration-300`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4 h-10">
                {plan.description}
              </p>

              {plan.image && (
                <div className="mb-4 relative w-full h-40 rounded-lg overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-1">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1 bg-primary-500/20 p-1 rounded-full">
                      <Check className="w-3 h-3 text-primary-400" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 glass-dark rounded-xl p-6 max-w-2xl mx-auto"
        >
          <p className="text-gray-300">
            ✅ <span className="font-semibold text-white">Jaminan 30 hari</span>{" "}
            uang kembali • Gratis trial 14 hari • Tanpa kartu kredit
          </p>
        </motion.div>
      </div>
    </section>
  );
}
