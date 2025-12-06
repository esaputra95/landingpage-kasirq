import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { prisma } from "@/lib/prisma";

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

async function getPricingPlans() {
  const plans = await prisma.pricingPlan.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
  return plans.map((plan) => ({
    ...plan,
    features: JSON.parse(plan.features),
  }));
}

async function getFAQs() {
  return await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export default async function Home() {
  const testimonials = await getTestimonials();
  const pricingPlans = await getPricingPlans();
  const faqs = await getFAQs();

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials data={testimonials} />
      <HowItWorks />
      <Pricing data={pricingPlans} />
      <FAQ data={faqs} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
