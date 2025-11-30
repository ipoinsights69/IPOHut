import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");

    if (token !== process.env.REVALIDATION_TOKEN) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    try {
        // Revalidate the entire application
        const result = revalidatePath("/", "layout");
        return NextResponse.json({ ok: true, result });

    } catch (err) {
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}
