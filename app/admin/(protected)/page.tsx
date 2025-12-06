import { prisma } from "@/lib/prisma";
import { Users, CreditCard, MessageCircle, Mail } from "lucide-react";

async function getStats() {
  const testimonialsCount = await prisma.testimonial.count();
  const pricingPlansCount = await prisma.pricingPlan.count();
  const faqsCount = await prisma.fAQ.count();
  const contactSubmissionsCount = await prisma.contactSubmission.count();

  return {
    testimonialsCount,
    pricingPlansCount,
    faqsCount,
    contactSubmissionsCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Total Testimonials</h3>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.testimonialsCount}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Active Plans</h3>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <CreditCard className="text-purple-500" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.pricingPlansCount}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">FAQs</h3>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <MessageCircle className="text-green-500" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.faqsCount}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Inquiries</h3>
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Mail className="text-orange-500" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.contactSubmissionsCount}</p>
        </div>
      </div>
    </div>
  );
}
