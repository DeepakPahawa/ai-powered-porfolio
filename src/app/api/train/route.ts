// export const runtime = "edge"; // Works fine with Edge

import { ResumeStorage } from "@/lib/ResumeStorage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resumeContent = body.resumeText || "";
    const resumeStorage = ResumeStorage.getInstance();
    resumeStorage.setResumeContent(resumeContent);

    return NextResponse.json({
      success: true,
      message: "Resume stored successfully",
    });
  } catch (error) {
    console.error("Train error:", error);
    return NextResponse.json(
      { error: "Failed to store resume." },
      { status: 500 }
    );
  }
}

export function GET() {
  const resumeStorage = ResumeStorage.getInstance();
  return NextResponse.json({ resume: resumeStorage.getResumeContent() });
}
