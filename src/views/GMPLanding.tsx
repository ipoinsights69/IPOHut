"use client";

import Link from "next/link";
import { IPOData } from "@/data/ipos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, TrendingDown, ArrowRight, Info, Shield, ChartLine, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GMPLandingProps {
  ipoData: IPOData[];
}

const GMPLanding = ({ ipoData }: GMPLandingProps) => {
  // Get top 15 IPOs with GMP data, sorted by date
  const latestGMPs = ipoData
    .filter(ipo => (ipo.gmpPrice || 0) > 0)
    .sort((a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime())
    .slice(0, 15);

  const getGMPTrend = (premium: number) => {
    if (premium > 0) return { icon: TrendingUp, color: "text-green-600 dark:text-green-500", bg: "bg-green-50 dark:bg-green-950" };
    if (premium < 0) return { icon: TrendingDown, color: "text-red-600 dark:text-red-500", bg: "bg-red-50 dark:bg-red-950" };
    return { icon: TrendingUp, color: "text-muted-foreground", bg: "bg-muted" };
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-section-title sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              IPO GMP Today: Live Grey Market Premium Prices
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Get real-time IPO Grey Market Premium (GMP) rates, expected listing prices, and grey market trends for all upcoming and open IPOs in India.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <ChartLine className="w-4 h-4 mr-2" />
                Real-time GMP Data
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Expert Analysis
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Info className="w-4 h-4 mr-2" />
                Updated Daily
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Latest GMP Table */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl sm:text-section-title font-bold text-foreground mb-2">Latest IPO GMP Price Today</h2>
              <p className="text-muted-foreground">Current grey market premium rates for upcoming IPOs</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/gmp-tracker">
                View Full Tracker
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">IPO Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground hidden sm:table-cell">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">GMP</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Premium %</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground hidden lg:table-cell">Expected Listing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestGMPs.map((ipo) => {
                      const trend = getGMPTrend(ipo.gmpPremium || 0);
                      const TrendIcon = trend.icon;

                      return (
                        <tr key={ipo.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <Link href={`/ipo/${ipo.id}`} className="text-foreground hover:text-primary font-medium transition-colors">
                              {ipo.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <Badge variant={ipo.status === 'Open' ? 'default' : 'secondary'} className="text-xs">
                              {ipo.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <TrendIcon className={`w-4 h-4 ${trend.color}`} />
                              <span className="font-semibold">₹{ipo.gmpPrice}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`font-semibold ${trend.color}`}>
                              {(ipo.gmpPremium || 0) > 0 ? '+' : ''}{ipo.gmpPremiumPercent}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right hidden lg:table-cell">
                            <span className="text-muted-foreground">
                              ₹{((ipo.issuePrice || 0) + (ipo.gmpPrice || 0)).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Educational Content */}
        <section className="mb-12 sm:mb-16">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl sm:text-section-title font-bold text-foreground mb-6">What is IPO GMP (Grey Market Premium)?</h2>

            <div className="grid md:grid-cols-2 gap-card mb-8 not-prose">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Understanding GMP
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Grey Market Premium (GMP) is the premium amount at which an IPO share is traded in the grey market before its official listing on stock exchanges. It indicates investor sentiment and expected listing price.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartLine className="w-5 h-5 text-primary" />
                    How GMP Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>If an IPO has a price band of ₹100-₹110 and GMP is ₹50, the expected listing price would be ₹160 (₹110 + ₹50). GMP fluctuates based on demand, market conditions, and subscription levels.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Kostak & Subject to Sauda
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p><strong>Kostak:</strong> Price offered if shares are not allotted. <strong>Subject to Sauda:</strong> Price paid if shares are allotted. These grey market transactions happen before listing.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Important Note
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Grey market trading is unofficial and unregulated. GMP is just an indicator and doesn't guarantee listing price. Always conduct thorough research before making investment decisions.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 border rounded-lg p-card mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Track IPO GMP?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Market Sentiment:</strong> GMP reflects investor confidence and demand for the IPO before listing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Expected Returns:</strong> Helps estimate potential listing gains or losses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Application Decision:</strong> Assists in deciding whether to apply for an IPO</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Trend Analysis:</strong> Track how GMP changes from opening to listing date</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-4">How to Use GMP Data for Investment Decisions</h3>
            <p className="text-muted-foreground mb-4">
              While GMP is a useful indicator, it should be used alongside fundamental analysis. Here's how to effectively use GMP data:
            </p>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li><strong>Compare with fundamentals:</strong> Check if the company's financials justify the GMP premium</li>
              <li><strong>Track GMP trends:</strong> Observe how GMP changes from open date to listing date</li>
              <li><strong>Consider subscription levels:</strong> High subscription with positive GMP is generally bullish</li>
              <li><strong>Market conditions:</strong> Overall market sentiment affects listing performance</li>
              <li><strong>Sector performance:</strong> Check how similar companies in the sector are performing</li>
            </ol>
          </article>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-section-title font-bold text-foreground mb-6">Frequently Asked Questions (FAQ)</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                What does IPO GMP mean and how is it calculated?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                IPO GMP (Grey Market Premium) is the amount at which IPO shares trade in the unofficial grey market before listing. It's calculated as the difference between the grey market price and the IPO issue price. For example, if the issue price is ₹100 and shares trade at ₹150 in grey market, the GMP is ₹50.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Is grey market trading legal in India?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Grey market trading operates in an unofficial capacity and is not regulated by SEBI. While not explicitly illegal, it's not officially recognized or protected by law. Transactions are based on trust between parties. We recommend using GMP only as an indicator and not participating in grey market trading.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How accurate is IPO GMP in predicting listing price?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                GMP accuracy varies. In stable market conditions with strong fundamentals, GMP can be a fairly reliable indicator. However, it can change dramatically based on market sentiment, overall market conditions, and subscription numbers. Historical data shows GMP accuracy ranges from 60-75%. Always use it as one of many factors in your analysis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What is the difference between Kostak and Subject to Sauda?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <strong>Kostak:</strong> The amount paid to you if you don't get allotment. Dealers buy your application rights before allotment results.
                <br /><br />
                <strong>Subject to Sauda:</strong> The amount you receive if you get allotment and sell your shares to the dealer before listing. This is typically higher than Kostak as it includes actual shares.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                When does IPO GMP start and when does it end?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                IPO GMP typically starts a few days before the IPO opens for subscription and continues until the listing day. It's most active during the subscription period and peaks just before listing. After listing, grey market trading ends as shares become available on official exchanges.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Should I apply for an IPO if GMP is negative?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Negative GMP indicates weak market sentiment but doesn't necessarily mean the IPO is bad. Consider these factors: company fundamentals, industry outlook, valuation metrics, promoter track record, and your investment horizon. Sometimes IPOs with initial negative GMP perform well post-listing based on strong fundamentals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                How often is IPO GMP data updated on IPOHut?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We update IPO GMP data multiple times daily to ensure you have the most current information. During peak subscription periods, GMP prices can fluctuate significantly, and we strive to reflect these changes as quickly as possible. Check the last updated timestamp on each IPO's detail page for specific timing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                Can GMP change after IPO subscription closes?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, GMP can and often does change after subscription closes. It typically increases if the IPO is heavily oversubscribed and market sentiment remains positive. Conversely, it may decrease if market conditions deteriorate or if there are concerns about allotment basis or listing date delays.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 border rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-section-title font-bold text-foreground mb-4">
            Track All IPO GMP Prices in Real-Time
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Access comprehensive GMP data, historical trends, and detailed analysis for all upcoming and open IPOs. Make informed investment decisions with our advanced tracking tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/gmp-tracker">
                View Full GMP Tracker
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/open-ipos">
                Open IPOs
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GMPLanding;