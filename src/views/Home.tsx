"use client";

import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPOData } from "@/data/ipos";
import { TrendingUp, TrendingDown, Calendar, DollarSign, Users, BarChart3, ArrowRight, Building2, Sparkles, ExternalLink, Activity, Filter, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HomeProps {
  ipoData: IPOData[];
}

const Home = ({ ipoData }: HomeProps) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  // Filter by sector if one is selected
  const filteredData = selectedSector
    ? ipoData.filter((ipo) => ipo.sector === selectedSector)
    : ipoData;

  const listedIPOs = filteredData.filter((ipo) => ipo.status === "Listed");
  const openIPOs = filteredData.filter((ipo) => ipo.status === "Open");
  const upcomingIPOs = filteredData.filter((ipo) => ipo.status === "Upcoming");
  const closedIPOs = filteredData.filter((ipo) => ipo.status === "Closed");

  // Calculate sector distribution
  const sectorDistribution = ipoData.reduce((acc, ipo) => {
    acc[ipo.sector] = (acc[ipo.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedSectors = Object.entries(sectorDistribution)
    .sort((a, b) => b[1] - a[1]);

  const topGainers = [...listedIPOs].sort((a, b) => b.priceChangePercent - a.priceChangePercent).slice(0, 5);
  const topLosers = [...listedIPOs].sort((a, b) => a.priceChangePercent - b.priceChangePercent).slice(0, 5);

  const totalIssueSize = ipoData.reduce((acc, ipo) => {
    const size = parseFloat(ipo.issueSize.replace(/[^0-9.]/g, ""));
    return acc + size;
  }, 0);

  const avgSubscription = listedIPOs.reduce((acc, ipo) => acc + ipo.subscriptionOverall, 0) / listedIPOs.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-success/10 text-success border-success/20";
      case "Closed": return "bg-warning/10 text-warning border-warning/20";
      case "Listed": return "bg-gold/10 text-gold border-gold/20";
      case "Upcoming": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTicker />

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-heading text-hero font-bold mb-3 sm:mb-4 text-foreground">
              India's Premier IPO Hub
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IPO insights with GMP data, subscription tracking, and AI-powered analysis
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Building2, label: "Total IPOs", value: ipoData.length },
              { icon: Calendar, label: "Open Now", value: openIPOs.length },
              { icon: DollarSign, label: "Total Size", value: `₹${totalIssueSize.toFixed(0)}k Cr` },
              { icon: BarChart3, label: "Avg Sub", value: `${avgSubscription.toFixed(1)}x` }
            ].map((stat, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <div className="p-card">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-muted mb-2 sm:mb-3 inline-block">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                  <p className="text-stat font-bold mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Sector Distribution Widget */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-muted">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-section-title font-bold">IPOs by Sector</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Filter by industry sector</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedSector && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSector(null)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filter
                </Button>
              )}
              <Link href="/sectors">
                <Button variant="outline" size="sm" className="gap-2">
                  View Analysis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              {sortedSectors.map(([sector, count]) => {
                const isSelected = selectedSector === sector;
                return (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(isSelected ? null : sector)}
                    className={`px-4 py-2.5 rounded-lg border transition-all hover:shadow-md ${isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 hover:bg-muted border-border"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{sector}</span>
                      <Badge
                        variant="secondary"
                        className={isSelected ? "bg-primary-foreground/20 text-primary-foreground" : ""}
                      >
                        {count}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedSector && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredData.length}</span> IPOs in <span className="font-semibold text-foreground">{selectedSector}</span>
                  {" "}({openIPOs.length} Open, {listedIPOs.length} Listed, {upcomingIPOs.length} Upcoming, {closedIPOs.length} Closed)
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Market Movers */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <Card className="overflow-hidden">
            <div className="p-4 sm:p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-success/10">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Top Gainers</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Best performing IPOs</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success/30 text-xs sm:text-sm">+{topGainers[0]?.priceChangePercent.toFixed(1)}%</Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground">#</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Company</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground">Price</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topGainers.map((ipo, idx) => (
                    <tr key={ipo.id} className="border-b hover:bg-muted/50 transition-colors group cursor-pointer">
                      <td className="p-2 sm:p-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center font-semibold text-xs sm:text-sm text-muted-foreground">
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-2 sm:p-4">
                        <Link href={`/ipo/${ipo.id}`} className="block">
                          <p className="text-sm sm:text-base font-semibold group-hover:text-success transition-colors">{ipo.name}</p>
                          <p className="text-xs text-muted-foreground">{ipo.symbol}</p>
                        </Link>
                      </td>
                      <td className="p-2 sm:p-4 text-right">
                        <p className="text-sm sm:text-base font-mono font-semibold">₹{ipo.currentPrice}</p>
                        <p className="text-xs text-muted-foreground">From ₹{ipo.issuePrice}</p>
                      </td>
                      <td className="p-2 sm:p-4 text-right">
                        <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-success/10">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                          <span className="text-xs sm:text-sm font-mono font-bold text-success">+{ipo.priceChangePercent.toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Top Losers */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-destructive/10">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Top Losers</h3>
                    <p className="text-sm text-muted-foreground">Underperforming IPOs</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-destructive border-destructive/30">{topLosers[0]?.priceChangePercent.toFixed(1)}%</Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground">#</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Company</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground">Price</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topLosers.map((ipo, idx) => (
                    <tr key={ipo.id} className="border-b hover:bg-muted/50 transition-colors group cursor-pointer">
                      <td className="p-4">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center font-semibold text-sm text-muted-foreground">
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link href={`/ipo/${ipo.id}`} className="block">
                          <p className="font-semibold group-hover:text-destructive transition-colors">{ipo.name}</p>
                          <p className="text-xs text-muted-foreground">{ipo.symbol}</p>
                        </Link>
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-mono font-semibold">₹{ipo.currentPrice}</p>
                        <p className="text-xs text-muted-foreground">From ₹{ipo.issuePrice}</p>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10">
                          <TrendingDown className="w-4 h-4 text-destructive" />
                          <span className="font-mono font-bold text-destructive">{ipo.priceChangePercent.toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Open IPOs */}
        {openIPOs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-section-title font-bold mb-1">Open IPOs</h2>
                <p className="text-sm text-muted-foreground">Subscribe before it's too late</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-success border-success/30 px-3 py-1">
                  {openIPOs.length} Live
                </Badge>
                <Link href="/open">
                  <Button size="sm" variant="outline" className="gap-2">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openIPOs.map((ipo) => (
                <Card key={ipo.id} className="hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{ipo.name}</h3>
                        <p className="text-sm text-muted-foreground">{ipo.symbol} • {ipo.sector}</p>
                      </div>
                      <Badge variant="outline" className="text-success border-success/30">
                        LIVE
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">Issue Price</span>
                        <span className="font-mono font-semibold">₹{ipo.issuePrice}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">GMP Premium</span>
                        <span className="font-mono font-semibold text-success">+₹{ipo.gmpPremium} ({ipo.gmpPremiumPercent?.toFixed(1)}%)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">Subscription</span>
                        <span className="font-mono font-semibold">{ipo.subscriptionOverall > 0 ? `${ipo.subscriptionOverall}x` : "Pending"}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-3">
                      <p className="text-xs text-muted-foreground flex items-center justify-between">
                        <span>Closes on</span>
                        <span className="font-semibold text-foreground">{ipo.closeDate}</span>
                      </p>
                      <Link href={`/ipo/${ipo.id}`}>
                        <Button className="w-full" size="sm" variant="outline">
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Listed IPOs */}
        {listedIPOs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-1">Recently Listed</h2>
                <p className="text-muted-foreground">Track post-listing performance</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  {listedIPOs.length} Listed
                </Badge>
                <Link href="/listed">
                  <Button variant="outline" size="sm" className="gap-2">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30 border-b">
                      <th className="text-left p-4 text-sm font-semibold">Company</th>
                      <th className="text-right p-4 text-sm font-semibold">Issue Price</th>
                      <th className="text-right p-4 text-sm font-semibold">Current Price</th>
                      <th className="text-right p-4 text-sm font-semibold">Gain/Loss</th>
                      <th className="text-right p-4 text-sm font-semibold">Subscription</th>
                      <th className="text-right p-4 text-sm font-semibold">Listed On</th>
                      <th className="text-right p-4 text-sm font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listedIPOs.slice(0, 6).map((ipo) => (
                      <tr key={ipo.id} className="border-b hover:bg-muted/50 transition-colors group cursor-pointer">
                        <td className="p-4">
                          <Link href={`/ipo/${ipo.id}`} className="block">
                            <p className="font-semibold group-hover:text-primary transition-colors">{ipo.name}</p>
                            <p className="text-xs text-muted-foreground">{ipo.symbol} • {ipo.sector}</p>
                          </Link>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-mono font-semibold">₹{ipo.issuePrice}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className={`font-mono font-bold ${ipo.priceChangePercent >= 0 ? "text-success" : "text-destructive"}`}>
                            ₹{ipo.currentPrice}
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${ipo.listingGainPercent >= 0 ? "bg-success/10" : "bg-destructive/10"
                            }`}>
                            {ipo.listingGainPercent >= 0 ?
                              <TrendingUp className="w-4 h-4 text-success" /> :
                              <TrendingDown className="w-4 h-4 text-destructive" />
                            }
                            <span className={`font-mono font-bold ${ipo.listingGainPercent >= 0 ? "text-success" : "text-destructive"
                              }`}>
                              {ipo.listingGainPercent >= 0 ? "+" : ""}{ipo.listingGainPercent.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-mono font-semibold">{ipo.subscriptionOverall}x</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm text-muted-foreground">{ipo.listingDate}</p>
                        </td>
                        <td className="p-4 text-right">
                          <Link href={`/ipo/${ipo.id}`}>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Upcoming & Closed */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming IPOs */}
          {upcomingIPOs.length > 0 && (
            <Card className="overflow-hidden">
              <div className="p-6 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-muted">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Upcoming IPOs</h3>
                      <p className="text-sm text-muted-foreground">Pipeline for {new Date().getFullYear()}</p>
                    </div>
                  </div>
                  <Link href="/upcoming">
                    <Button variant="ghost" size="sm" className="gap-2">
                      All <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="divide-y max-h-96 overflow-y-auto">
                {upcomingIPOs.slice(0, 5).map((ipo) => (
                  <Link key={ipo.id} href={`/ipo/${ipo.id}`}>
                    <div className="p-4 hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold">{ipo.name}</p>
                          <p className="text-xs text-muted-foreground">{ipo.sector} • Opens {ipo.openDate}</p>
                        </div>
                        <Badge variant="outline" className="text-primary border-primary/30">
                          Upcoming
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Closed IPOs */}
          {closedIPOs.length > 0 && (
            <Card className="overflow-hidden">
              <div className="p-6 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-muted">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Closed IPOs</h3>
                      <p className="text-sm text-muted-foreground">Awaiting allotment</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-warning border-warning/30 px-3 py-1">
                    {closedIPOs.length}
                  </Badge>
                </div>
              </div>
              <div className="divide-y max-h-96 overflow-y-auto">
                {closedIPOs.slice(0, 5).map((ipo) => (
                  <Link key={ipo.id} href={`/ipo/${ipo.id}`}>
                    <div className="p-4 hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold">{ipo.name}</p>
                          <p className="text-xs text-muted-foreground">Sub: {ipo.subscriptionOverall}x • Closed {ipo.closeDate}</p>
                        </div>
                        <Badge variant="outline" className="text-warning border-warning/30">
                          Closed
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
