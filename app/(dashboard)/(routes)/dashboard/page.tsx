"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-green-700",
    bgColor: "text-green-700/10",
    href: "/image",
    status: "Beta",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "text-orange-500/10",
    href: "/video",
    status: "Alpha",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "text-emerald-500/10",
    href: "/music",
    status: "Alpha",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-gray-700",
    bgColor: "text-gray-700/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold">
          Explore the power of CloudSpike
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with a smart AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}></tool.icon>
              </div>
              <div className="font-semibold">
                {tool.label}
                {tool.status != null && (
                  <Badge variant={"dark_outline"} className="ml-2">
                    {tool.status}
                  </Badge>
                )}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
