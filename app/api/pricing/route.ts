import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    // Parse features JSON string back to array
    const formattedPlans = plans.map((plan) => ({
      ...plan,
      features: JSON.parse(plan.features),
    }));

    return NextResponse.json(formattedPlans);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pricing plans" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Ensure features is stringified if it comes as array
    // This check is still useful if body.features might already be a string
    // If it's guaranteed to be an array, then JSON.stringify directly is fine.
    let featuresToStore = body.features;
    if (Array.isArray(body.features)) {
      featuresToStore = JSON.stringify(body.features);
    } else if (typeof body.features !== "string") {
      // Handle cases where features might be null/undefined or other types
      // For now, assume it's either array or string, or will be stringified.
      // If it's not an array and not a string, stringify it anyway.
      featuresToStore = JSON.stringify(body.features);
    }

    const plan = await prisma.pricingPlan.create({
      data: {
        name: body.name,
        price: body.price,
        period: body.period,
        description: body.description,
        image: body.image,
        features: featuresToStore, // Use the potentially stringified features
        ctaText: body.ctaText,
        isPopular: body.isPopular,
        order: body.order,
        isActive: body.isActive,
      },
    });
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create pricing plan" },
      { status: 500 }
    );
  }
}
