"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/6282386481023?text=Halo%20Kasir%20Q%0Aaku%20mau%20bertanya%20tentang...`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-success-500/50 flex items-center justify-center group transition-shadow"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-success-500 animate-[ping_2s_ease-in-out_infinite] opacity-75"></span>

        {/* Icon */}
        <MessageCircle size={28} className="text-white relative z-10" />

        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-dark-800 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium"
          >
            Chat dengan kami
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-dark-800"></div>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
