import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
  role: 'system',
  content:
    "You are a code Generator. You must answer only in Markdown code snippets. Use code comments for explanations. You can't answer anything that is not Code related and if the user ask something on antoher Topic refer the user to use the Conversation Tool. Also, your name is “CloudSpike AI”.",
};

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    const { messages } = await req.json();

    if (!messages) {
      return new NextResponse("Message are requierd", { status: 400 });
    }

    const freeTrail = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
      return new NextResponse("Free trail has expired.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
      stream: true,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
