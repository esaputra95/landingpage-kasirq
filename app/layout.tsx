import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KasirQ - Aplikasi POS Modern untuk Mobile & Web",
  description:
    "Aplikasi Point of Sale (POS) digital yang dapat diakses melalui mobile dan web secara bersamaan dengan data tersinkronisasi real-time. Kelola bisnis Anda dengan lebih efisien.",
  keywords: [
    "POS",
    "Point of Sale",
    "Aplikasi Kasir",
    "Mobile POS",
    "Web POS",
    "Kasir Digital",
    "KasirQ",
  ],
  authors: [{ name: "KasirQ" }],
  openGraph: {
    title: "KasirQ - Aplikasi POS Modern untuk Mobile & Web",
    description:
      "Kelola bisnis Anda dengan aplikasi POS yang dapat diakses kapan saja, di mana saja",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}

        {/* Tawk.to Live Chat Widget */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/YOUR_TAWK_TO_PROPERTY_ID/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
