"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";

const news = [
  { icon: TrendingUp, text: "Vishal Mega Mart IPO subscribed 9.4x overall - Apply now!", type: "hot" },
  { icon: Calendar, text: "Platinum Industries IPO opens Dec 18, 2025", type: "info" },
  { icon: DollarSign, text: "Tenneco Clean Air gains 25.19% post-listing", type: "success" },
  { icon: TrendingUp, text: "Sai Life Sciences IPO live - Subscribe today", type: "hot" },
  { icon: Calendar, text: "Transrail Lighting IPO coming Dec 19, 2025", type: "info" },
];

const NewsTicker = () => {
  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-primary-foreground text-primary font-bold text-xs whitespace-nowrap">
            LIVE
          </Badge>
          <div className="flex-1 overflow-hidden">
            <div className="animate-[scroll_40s_linear_infinite] flex gap-8">
              {[...news, ...news].map((item, index) => (
                <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                  {index < news.length * 2 - 1 && (
                    <span className="text-primary-foreground/50 mx-4">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
