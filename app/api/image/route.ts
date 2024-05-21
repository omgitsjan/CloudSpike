import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { resolutionOptions } from "@/app/(dashboard)/(routes)/image/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body.values;

    const amountInt = parseInt(amount, 10)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are requierd", { status: 400 });
    }

    if (!amountInt) {
      return new NextResponse("The Amount is requierd", { status: 400 });
    }

    if(amountInt > 3){
      return new NextResponse("The Amount is to high", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution are requierd", { status: 400 });
    }

    if(!resolutionOptions.includes(resolution)){
      return new NextResponse("Resolution not found", { status: 400 });
    }

    const freeTrail = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
      return new NextResponse("Free trail has expired.", { status: 403 });
    }


    const response = await openai.images.generate({
      prompt,
      n: amountInt,
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
