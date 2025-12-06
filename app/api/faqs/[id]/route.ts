import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.fAQ.delete({
      where: { id },
    });
    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
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
    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order,
      },
    });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}
