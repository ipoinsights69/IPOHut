"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IPOData } from "@/data/ipos";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Building2, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectorsProps {
  ipoData: IPOData[];
}

const Sectors = ({ ipoData }: SectorsProps) => {
  // Calculate sector distribution
  const sectorData = ipoData.reduce((acc, ipo) => {
    if (!acc[ipo.sector]) {
      acc[ipo.sector] = {
        name: ipo.sector,
        total: 0,
        open: 0,
        listed: 0,
        upcoming: 0,
        closed: 0,
        ipos: [],
      };
    }
    acc[ipo.sector].total += 1;
    acc[ipo.sector].ipos.push(ipo);

    if (ipo.status === "Open") acc[ipo.sector].open += 1;
    if (ipo.status === "Listed") acc[ipo.sector].listed += 1;
    if (ipo.status === "Upcoming") acc[ipo.sector].upcoming += 1;
    if (ipo.status === "Closed") acc[ipo.sector].closed += 1;

    return acc;
  }, {} as Record<string, any>);

  const sectors = Object.values(sectorData).sort((a: any, b: any) => b.total - a.total);

  // Prepare chart data
  const barChartData = sectors.map((sector: any) => ({
    name: sector.name.length > 15 ? sector.name.substring(0, 15) + "..." : sector.name,
    fullName: sector.name,
    count: sector.total,
    open: sector.open,
    listed: sector.listed,
  }));

  const pieChartData = sectors.slice(0, 8).map((sector: any) => ({
    name: sector.name,
    value: sector.total,
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))', 'hsl(var(--gold))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--secondary))'];

  // Sector descriptions
  const sectorDescriptions: Record<string, string> = {
    "Technology": "Technology sector includes companies involved in software development, IT services, digital platforms, and tech infrastructure. These companies drive innovation in digital transformation, cloud computing, cybersecurity, and enterprise solutions.",
    "Finance": "Financial sector encompasses banks, NBFCs, insurance companies, asset management firms, and fintech platforms. These institutions provide lending, investment, insurance, and financial services to individuals and businesses.",
    "Healthcare": "Healthcare sector includes pharmaceutical companies, hospitals, diagnostic labs, medical devices, and healthcare services. These companies focus on drug development, patient care, medical equipment, and health infrastructure.",
    "Manufacturing": "Manufacturing sector covers industrial production, engineering goods, machinery, and capital equipment. These companies produce goods ranging from heavy machinery to consumer durables and industrial components.",
    "Consumer Goods": "Consumer goods sector includes FMCG, retail, food & beverage, and lifestyle products. These companies manufacture and distribute products for everyday consumer use and personal consumption.",
    "Auto Components": "Auto components sector includes manufacturers of automobile parts, accessories, emission control systems, and automotive technology. These suppliers serve both OEMs and aftermarket segments.",
    "Real Estate": "Real estate sector comprises property developers, infrastructure builders, and housing finance companies. These firms develop residential, commercial, and industrial properties across urban and suburban areas.",
    "Energy": "Energy sector includes renewable energy, power generation, oil & gas, and energy infrastructure companies. These companies focus on electricity production, distribution, and sustainable energy solutions.",
    "Telecommunications": "Telecommunications sector covers mobile networks, internet service providers, telecom infrastructure, and digital communication platforms. These companies enable voice, data, and internet connectivity.",
    "Pharmaceuticals": "Pharmaceuticals sector includes drug manufacturers, biotech firms, and API producers. These companies research, develop, and manufacture medicines, vaccines, and therapeutic solutions.",
    "Infrastructure": "Infrastructure sector encompasses construction, roads, bridges, ports, and urban development projects. These companies build and maintain critical physical infrastructure for economic growth.",
    "E-commerce": "E-commerce sector includes online marketplaces, digital retail platforms, and logistics companies. These platforms enable digital buying and selling of goods and services with last-mile delivery.",
    "Insurance": "Insurance sector includes life, health, general, and specialized insurance providers. These companies offer risk protection and financial security through various insurance products and policies.",
    "Hospitality": "Hospitality sector covers hotels, resorts, travel services, and tourism-related businesses. These companies provide accommodation, food services, and travel experiences to domestic and international tourists.",
    "Education": "Education sector includes schools, colleges, EdTech platforms, and skill development companies. These institutions provide learning, training, and educational services through physical and digital channels.",
    "Logistics": "Logistics sector encompasses supply chain management, freight forwarding, warehousing, and delivery services. These companies ensure efficient movement and storage of goods across transportation networks.",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTicker />

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-4">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Sector Analysis</span>
            </div>
            <h1 className="font-heading text-section-title md:text-5xl font-bold mb-4 text-foreground">
              IPOs by Industry Sector
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive sector-wise breakdown of {ipoData.length} IPOs across {sectors.length} industries with detailed insights and trends
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{sectors.length}</p>
                <p className="text-sm text-muted-foreground">Sectors</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{ipoData.length}</p>
                <p className="text-sm text-muted-foreground">Total IPOs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{sectors[0]?.name}</p>
                <p className="text-sm text-muted-foreground">Top Sector</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{sectors[0]?.total}</p>
                <p className="text-sm text-muted-foreground">IPOs in Top</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-card">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>IPO Distribution by Sector</CardTitle>
              <CardDescription>Total number of IPOs in each sector</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelFormatter={(value, payload) => payload[0]?.payload?.fullName || value}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 8 Sectors Market Share</CardTitle>
              <CardDescription>Distribution of IPOs across major sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sector-wise Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Sector Analysis</CardTitle>
            <CardDescription>Explore IPOs by sector with comprehensive breakdowns</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sectors.map((sector: any, idx: number) => (
                <AccordionItem key={sector.name} value={`sector-${idx}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-base">{sector.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {sector.total} IPOs • {sector.listed} Listed • {sector.open} Open
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto mr-2">
                        {sector.total}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {/* Sector Description */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">About {sector.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {sectorDescriptions[sector.name] || `The ${sector.name} sector comprises companies operating in this industry vertical, providing products and services related to ${sector.name.toLowerCase()} activities.`}
                        </p>
                      </div>

                      {/* Status Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Total IPOs</p>
                          <p className="text-2xl font-bold">{sector.total}</p>
                        </div>
                        <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                          <p className="text-xs text-muted-foreground mb-1">Open</p>
                          <p className="text-2xl font-bold text-success">{sector.open}</p>
                        </div>
                        <div className="bg-gold/10 p-3 rounded-lg border border-gold/20">
                          <p className="text-xs text-muted-foreground mb-1">Listed</p>
                          <p className="text-2xl font-bold text-gold">{sector.listed}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                          <p className="text-xs text-muted-foreground mb-1">Upcoming</p>
                          <p className="text-2xl font-bold text-primary">{sector.upcoming}</p>
                        </div>
                      </div>

                      {/* IPO List */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">IPOs in {sector.name}</h4>
                        <div className="space-y-2">
                          {sector.ipos.map((ipo: any) => (
                            <Link key={ipo.id} href={`/ipo/${ipo.id}`}>
                              <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group">
                                <div className="flex-1">
                                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {ipo.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {ipo.symbol} • Issue: ₹{ipo.issuePrice} • {ipo.issueSize}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="outline"
                                    className={
                                      ipo.status === "Open" ? "text-success border-success/30" :
                                        ipo.status === "Listed" ? "text-gold border-gold/30" :
                                          ipo.status === "Upcoming" ? "text-primary border-primary/30" :
                                            "text-warning border-warning/30"
                                    }
                                  >
                                    {ipo.status}
                                  </Badge>
                                  {ipo.status === "Listed" && (
                                    <div className="flex items-center gap-1">
                                      {ipo.priceChangePercent >= 0 ? (
                                        <TrendingUp className="w-4 h-4 text-success" />
                                      ) : (
                                        <TrendingDown className="w-4 h-4 text-destructive" />
                                      )}
                                      <span className={`text-sm font-semibold ${ipo.priceChangePercent >= 0 ? "text-success" : "text-destructive"
                                        }`}>
                                        {ipo.priceChangePercent >= 0 ? "+" : ""}{ipo.priceChangePercent.toFixed(1)}%
                                      </span>
                                    </div>
                                  )}
                                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Sectors;
