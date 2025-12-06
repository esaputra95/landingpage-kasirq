import { prisma } from "@/lib/prisma";
import TestimonialClient from "./client";

export const dynamic = "force-dynamic";

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function AdminTestimonials() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Testimonials</h2>
      </div>
      <TestimonialClient initialData={testimonials} />
    </div>
  );
}
