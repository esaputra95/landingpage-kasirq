import { prisma } from "@/lib/prisma";
import PricingClient from "./client";

export const dynamic = "force-dynamic";

async function getPricingPlans() {
  const plans = await prisma.pricingPlan.findMany({
    orderBy: { order: "asc" },
  });
  return plans.map((plan) => ({
    ...plan,
    features: JSON.parse(plan.features),
  }));
}

export default async function AdminPricing() {
  const plans = await getPricingPlans();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Pricing Plans</h2>
      </div>
      <PricingClient initialData={plans} />
    </div>
  );
}
