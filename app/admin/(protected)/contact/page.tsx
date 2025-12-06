import { prisma } from "@/lib/prisma";
import ContactClient from "./client";

export const dynamic = "force-dynamic";

async function getSubmissions() {
  return await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminContact() {
  const submissions = await getSubmissions();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Contact Inquiries</h2>
      </div>
      <ContactClient initialData={submissions} />
    </div>
  );
}
