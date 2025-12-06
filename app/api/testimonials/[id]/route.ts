import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.testimonial.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
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
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        avatar: body.avatar,
        content: body.content,
        rating: body.rating,
        order: body.order,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}
