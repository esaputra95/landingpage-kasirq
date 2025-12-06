import { prisma } from "@/lib/prisma";
import FAQClient from "./client";

export const dynamic = "force-dynamic";

async function getFAQs() {
  return await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function AdminFAQs() {
  const faqs = await getFAQs();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage FAQs</h2>
      </div>
      <FAQClient initialData={faqs} />
    </div>
  );
}
