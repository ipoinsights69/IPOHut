"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPOData } from "@/data/ipos";
import { TrendingUp, Calendar, Users, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface OpenIPOsProps {
  ipoData: IPOData[];
}

const OpenIPOs = ({ ipoData }: OpenIPOsProps) => {
  const openIPOs = ipoData.filter((ipo) => ipo.status === "Open");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-success/10">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Open IPOs</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1">Currently accepting applications</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {openIPOs.length} Active IPO{openIPOs.length !== 1 ? 's' : ''}
            </Badge>
            <span className="text-sm text-muted-foreground">• Apply before closing date</span>
          </div>
        </div>
      </div>

      {/* Open IPOs Grid */}
      <div className="container mx-auto px-4 py-8">
        {openIPOs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {openIPOs.map((ipo) => (
              <Link href={`/ipo/${ipo.id}`} key={ipo.id}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:border-success/50 h-full">
                  <div className="p-card">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg sm:text-xl mb-1 group-hover:text-success transition-colors">
                          {ipo.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          <span>{ipo.sector}</span>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        {ipo.status}
                      </Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Issue Price</span>
                        <span className="font-mono font-bold">₹{ipo.issuePrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Issue Size</span>
                        <span className="font-mono font-semibold">{ipo.issueSize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Min Investment</span>
                        <span className="font-mono font-semibold">₹{ipo.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Subscription</span>
                        <span className="font-mono font-bold text-primary">{ipo.subscriptionOverall}x</span>
                      </div>
                    </div>

                    {/* GMP Info */}
                    {ipo.gmpPremium !== undefined && (
                      <div className="p-3 rounded-lg bg-muted/50 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">GMP</span>
                          <span className={`text-sm font-bold ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                            +₹{ipo.gmpPremium} ({ipo.gmpPremiumPercent?.toFixed(2)}%)
                          </span>
                        </div>
                        {ipo.expectedListing && (
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">Expected Listing</span>
                            <span className="text-sm font-mono font-semibold">₹{ipo.expectedListing}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Open Date</span>
                        <span className="font-medium">{ipo.openDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Close Date</span>
                        <span className="font-semibold text-destructive">{ipo.closeDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Listing Date</span>
                        <span className="font-medium">{ipo.listingDate}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button className="w-full mt-4 gap-2 group-hover:gap-3 transition-all">
                      View Details & Apply
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-xl mb-2">No Open IPOs</h3>
            <p className="text-muted-foreground mb-6">
              There are currently no IPOs accepting applications. Check back soon!
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

export default OpenIPOs;
