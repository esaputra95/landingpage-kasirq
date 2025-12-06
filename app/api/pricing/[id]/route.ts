import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.pricingPlan.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Pricing plan deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete pricing plan" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();

    let featuresToStore = body.features;
    if (Array.isArray(body.features)) {
      featuresToStore = JSON.stringify(body.features);
    } else if (typeof body.features !== "string") {
      featuresToStore = JSON.stringify(body.features);
    }

    const pricingPlan = await prisma.pricingPlan.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        period: body.period,
        description: body.description,
        image: body.image || "", // Convert empty string to null if desired, or keep as is
        features: featuresToStore,
        ctaText: body.ctaText,
        isPopular: body.isPopular,
        order: body.order,
      },
    });
    return NextResponse.json(pricingPlan);
  } catch (error) {
    console.error("Error updating pricing plan:", error);
    return NextResponse.json(
      { error: "Failed to update pricing plan" },
      { status: 500 }
    );
  }
}
