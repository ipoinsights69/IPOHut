"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPOData } from "@/data/ipos";
import { TrendingUp, TrendingDown, Building2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ListedIPOsProps {
  ipoData: IPOData[];
}

const ListedIPOs = ({ ipoData }: ListedIPOsProps) => {
  const listedIPOs = ipoData.filter((ipo) => ipo.status === "Listed");
  const [sortBy, setSortBy] = useState<"recent" | "gainers" | "losers">("recent");

  const sortedIPOs = [...listedIPOs].sort((a, b) => {
    if (sortBy === "gainers") return b.listingGainPercent - a.listingGainPercent;
    if (sortBy === "losers") return a.listingGainPercent - b.listingGainPercent;
    return 0; // recent - keep original order
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gold/10">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Listed IPOs</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1">IPOs currently trading on stock exchanges</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20">
              {listedIPOs.length} Listed IPO{listedIPOs.length !== 1 ? 's' : ''}
            </Badge>
            <span className="text-sm text-muted-foreground">• Live market data</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Sort by:</span>
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
            >
              Recently Listed
            </Button>
            <Button
              variant={sortBy === "gainers" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("gainers")}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Top Gainers
            </Button>
            <Button
              variant={sortBy === "losers" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("losers")}
              className="gap-2"
            >
              <TrendingDown className="w-4 h-4" />
              Top Losers
            </Button>
          </div>
        </div>
      </div>

      {/* Listed IPOs Grid */}
      <div className="container mx-auto px-4 py-8">
        {sortedIPOs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedIPOs.map((ipo) => (
              <Link href={`/ipo/${ipo.id}`} key={ipo.id}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:border-gold/50 h-full">
                  <div className="p-card">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg sm:text-xl mb-1 group-hover:text-gold transition-colors">
                          {ipo.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          <span>{ipo.sector}</span>
                        </div>
                      </div>
                      <Badge className="bg-gold/10 text-gold border-gold/20">
                        Listed
                      </Badge>
                    </div>

                    {/* Current Price & Change */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Current Price</span>
                        <span className="text-xs text-muted-foreground">Listed: {ipo.listingDate}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold font-mono">₹{ipo.currentPrice}</p>
                          <p className="text-xs text-muted-foreground mt-1">Issue: ₹{ipo.issuePrice}</p>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center gap-1 ${ipo.priceChangePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {ipo.priceChangePercent >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-mono font-bold">
                              {ipo.priceChangePercent >= 0 ? '+' : ''}{ipo.priceChangePercent.toFixed(2)}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {ipo.priceChange >= 0 ? '+' : ''}₹{ipo.priceChange.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Listing Gain */}
                    <div className={`p-3 rounded-lg mb-4 ${ipo.listingGainPercent >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">Listing Gain</span>
                        <span className={`text-lg font-bold font-mono ${ipo.listingGainPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {ipo.listingGainPercent >= 0 ? '+' : ''}{ipo.listingGainPercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Issue Size</span>
                        <span className="font-semibold">{ipo.issueSize}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Subscription</span>
                        <span className="font-bold text-primary">{ipo.subscriptionOverall}x</span>
                      </div>
                      {ipo.gmpPremium !== undefined && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">GMP (at listing)</span>
                          <span className="font-semibold">+₹{ipo.gmpPremium}</span>
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Button className="w-full mt-4 gap-2 group-hover:gap-3 transition-all">
                      View Trading Data
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-xl mb-2">No Listed IPOs</h3>
            <p className="text-muted-foreground mb-6">
              No IPOs have been listed yet. Check back soon!
            </p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ListedIPOs;
