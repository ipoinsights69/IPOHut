"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IPODataTabs from "@/components/IPODataTabs";
import TradingChart from "@/components/TradingChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowLeft, Calendar, Users, BarChart3, CheckCircle2, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { IPOData } from "@/data/ipos";
import { cn } from "@/lib/utils";

interface IPODetailsProps {
  ipo: IPOData;
}

const IPODetails = ({ ipo }: IPODetailsProps) => {

  // Timeline data based on IPO status
  const getTimelineSteps = () => {
    const steps = [
      { label: "Open", date: ipo.openDate, status: "completed" },
      { label: "Close", date: ipo.closeDate, status: ipo.status === "Open" ? "active" : "completed" },
      { label: "Allotment", date: "2-3 days", status: ipo.status === "Closed" ? "active" : ipo.status === "Listed" ? "completed" : "upcoming" },
      { label: "Listing", date: ipo.listingDate, status: ipo.status === "Listed" ? "completed" : "upcoming" },
    ];

    if (ipo.status === "Upcoming") {
      return steps.map((step, idx) => ({ ...step, status: idx === 0 ? "active" : "upcoming" }));
    }

    return steps;
  };

  const timelineSteps = getTimelineSteps();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* IPO Details Header - Redesigned */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          {/* Back Button */}
          <div className="mb-3 sm:mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 -ml-2">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Back to Home</span>
              </Button>
            </Link>
          </div>

          {/* IPO Name & Status */}
          <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-foreground">{ipo.name}</h1>
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground flex-wrap">
                <span className="font-semibold">{ipo.symbol}</span>
                <span>•</span>
                <span>{ipo.sector}</span>
                <span>•</span>
                <span className="font-mono">{ipo.issueSize}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                className={`flex-shrink-0 text-xs sm:text-sm px-3 py-1.5 ${ipo.status === "Listed" ? "bg-gold/10 text-gold border-gold/20" :
                  ipo.status === "Open" ? "bg-success/10 text-success border-success/20" :
                    ipo.status === "Upcoming" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-muted text-muted-foreground"
                  }`}
              >
                {ipo.status}
              </Badge>
              {(ipo.status === "Closed" || ipo.status === "Listed") && (
                <Link href={`/ipo/${ipo.id}/allotment`}>
                  <Button size="sm" variant="outline" className="w-full gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    Check Allotment
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Key Metrics Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded bg-muted">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Issue Price</p>
              </div>
              <p className="font-mono text-lg sm:text-xl font-bold text-foreground">₹{ipo.issuePrice}</p>
            </Card>

            {ipo.status === "Listed" && ipo.currentPrice && (
              <>
                <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded ${ipo.priceChangePercent >= 0 ? "bg-success/10" : "bg-destructive/10"}`}>
                      {ipo.priceChangePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Current Price</p>
                  </div>
                  <p className={`font-mono text-lg sm:text-xl font-bold ${ipo.priceChangePercent >= 0 ? "text-success" : "text-destructive"}`}>
                    ₹{ipo.currentPrice}
                  </p>
                </Card>

                <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded ${ipo.priceChangePercent >= 0 ? "bg-success/10" : "bg-destructive/10"}`}>
                      {ipo.priceChangePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Listing Gain</p>
                  </div>
                  <p className={`font-mono text-lg sm:text-xl font-bold ${ipo.listingGainPercent >= 0 ? "text-success" : "text-destructive"}`}>
                    {ipo.listingGainPercent >= 0 ? "+" : ""}{ipo.listingGainPercent.toFixed(2)}%
                  </p>
                </Card>
              </>
            )}

            <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded bg-primary/10">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Subscription</p>
              </div>
              <p className="font-mono text-lg sm:text-xl font-bold text-foreground">{ipo.subscriptionOverall}x</p>
            </Card>

            {ipo.gmpPremium !== undefined && (
              <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1.5 rounded ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent > 0 ? "bg-success/10" : "bg-muted"}`}>
                    <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent > 0 ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">GMP</p>
                </div>
                <p className={`font-mono text-lg sm:text-xl font-bold ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent > 0 ? "text-success" : "text-muted-foreground"}`}>
                  +₹{ipo.gmpPremium}
                </p>
              </Card>
            )}

            <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-300 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded bg-muted">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Lot Size</p>
              </div>
              <p className="font-mono text-lg sm:text-xl font-bold text-foreground">{ipo.lotSize || "N/A"}</p>
            </Card>
          </div>

          {/* Timeline - Horizontal Mobile Optimized */}
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">IPO Timeline</h3>
            </div>

            <div className="relative">
              {/* Horizontal Timeline */}
              <div className="flex items-start justify-between relative pb-2 overflow-x-auto">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 sm:h-1 bg-muted mx-4 sm:mx-8" />
                <div
                  className="absolute top-5 left-0 h-0.5 sm:h-1 bg-primary mx-4 sm:mx-8 transition-all duration-500"
                  style={{
                    width: `${(timelineSteps.filter(s => s.status === "completed").length / timelineSteps.length) * 100}%`
                  }}
                />

                {/* Timeline Steps */}
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10 min-w-[70px] sm:min-w-[100px] px-2">
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 sm:border-4 transition-all duration-300 mb-2",
                        step.status === "completed"
                          ? "bg-primary border-primary text-primary-foreground shadow-lg"
                          : step.status === "active"
                            ? "bg-background border-primary text-primary animate-pulse"
                            : "bg-background border-muted text-muted-foreground"
                      )}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Step Label */}
                    <p className={cn(
                      "text-xs sm:text-sm font-semibold text-center mb-1",
                      step.status === "completed" || step.status === "active"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}>
                      {step.label}
                    </p>

                    {/* Step Date */}
                    <p className="text-[10px] sm:text-xs text-muted-foreground text-center font-mono">
                      {step.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Chart for Listed IPOs - Most Prominent Position */}
      {ipo.status === "Listed" && ipo.tradingData && (
        <div className="bg-muted/30 border-y">
          <div className="container mx-auto px-4 py-6">
            <TradingChart data={ipo.tradingData} issuePrice={ipo.issuePrice} />
          </div>
        </div>
      )}

      {/* Company Information Section - Compact */}
      {(ipo.aboutCompany || ipo.aiKeyPoints || ipo.aiProsAndCons) && (
        <div className="container mx-auto px-4 py-4">
          <div className="space-y-3">

            {/* About Company - Compact */}
            {ipo.aboutCompany && (
              <Card className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h2 className="text-sm sm:text-base font-bold">About Company</h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {ipo.aboutCompany}
                </p>
              </Card>
            )}

            {/* AI Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

              {/* AI Key Points - Compact */}
              {ipo.aiKeyPoints && ipo.aiKeyPoints.length > 0 && (
                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-sm sm:text-base font-bold">Key Points</h2>
                    <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 text-[10px]">
                      AI
                    </Badge>
                  </div>
                  <ul className="space-y-1.5">
                    {ipo.aiKeyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-1.5 text-xs">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span className="text-muted-foreground leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* AI Pros - Compact */}
              {ipo.aiProsAndCons?.pros && ipo.aiProsAndCons.pros.length > 0 && (
                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <h2 className="text-sm sm:text-base font-bold">Pros</h2>
                    <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 text-[10px]">
                      AI
                    </Badge>
                  </div>
                  <ul className="space-y-1.5">
                    {ipo.aiProsAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-1.5 text-xs">
                        <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-muted-foreground leading-snug">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* AI Cons - Compact */}
              {ipo.aiProsAndCons?.cons && ipo.aiProsAndCons.cons.length > 0 && (
                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <h2 className="text-sm sm:text-base font-bold">Cons</h2>
                    <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 text-[10px]">
                      AI
                    </Badge>
                  </div>
                  <ul className="space-y-1.5">
                    {ipo.aiProsAndCons.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-1.5 text-xs">
                        <span className="text-destructive mt-0.5 flex-shrink-0">✗</span>
                        <span className="text-muted-foreground leading-snug">{con}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      <IPODataTabs />

      <Footer />
    </div>
  );
};

export default IPODetails;
