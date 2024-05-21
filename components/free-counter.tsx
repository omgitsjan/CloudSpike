"use clinet";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { InfinityIcon, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return (
      <div className="px-3">
        <Card className="bg-white/10 border-0">
          <CardContent className="py-6">
            <div className="text-center text-xs text-white mb-4 space-y-2">
              <span className="flex justify-center text-muted-foreground">
                <InfinityIcon className="h-4 w-4 mr-1" /> Generations
              </span>
            </div>
            <div className="w-full text-center">
              <Badge
                variant="premium"
                className="uppercase text-sm py-1"
              >
               Pro Version <Zap className="w-4 h-4 ml-2 fill-white" />
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            variant="premium"
            className="w-full"
            onClick={proModal.onOpen}
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
