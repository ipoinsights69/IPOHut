"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, TrendingUp, Info, AlertCircle, FileText, BarChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Learning Resources
          </div>
          <h1 className="text-hero font-heading font-bold mb-6">
            IPO Investment Guide & Resources
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about investing in IPOs, understanding market dynamics,
            and making informed decisions in the Indian stock market.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-card mb-16">
          <a href="#ipo-basics" className="p-card rounded-lg border bg-card hover:border-primary transition-colors">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">IPO Basics</h3>
            <p className="text-sm text-muted-foreground">Learn the fundamentals of IPO investing</p>
          </a>
          <a href="#gmp-guide" className="p-card rounded-lg border bg-card hover:border-primary transition-colors">
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">GMP Explained</h3>
            <p className="text-sm text-muted-foreground">Understanding Grey Market Premium</p>
          </a>
          <a href="#market-analysis" className="p-card rounded-lg border bg-card hover:border-primary transition-colors">
            <BarChart className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
            <p className="text-sm text-muted-foreground">How to analyze IPO opportunities</p>
          </a>
        </div>

        {/* IPO Basics Section */}
        <div id="ipo-basics" className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-section-title font-heading font-bold">IPO Investment Guide</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-ipo" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                What is an IPO?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">
                  An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time.
                  This allows the company to raise capital from public investors and becomes listed on a stock exchange like BSE or NSE.
                </p>
                <p className="mb-4">
                  <strong>Key Components:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Issue Price:</strong> The price at which shares are offered to investors</li>
                  <li><strong>Issue Size:</strong> Total amount of capital being raised</li>
                  <li><strong>Lot Size:</strong> Minimum number of shares an investor must apply for</li>
                  <li><strong>Price Band:</strong> Range within which investors can bid for shares</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-apply" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                How to Apply for an IPO?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">
                  You can apply for an IPO through three methods:
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Online through Net Banking (ASBA):</strong> Most convenient method.
                    Login to your net banking, select IPO application, and apply directly.
                  </li>
                  <li>
                    <strong>Through Trading Platform:</strong> Most brokers like Zerodha, Upstox, Groww
                    offer IPO application through their apps.
                  </li>
                  <li>
                    <strong>Offline through Bank:</strong> Visit your bank branch with a physical application form.
                  </li>
                </ol>
                <p className="mt-4">
                  <strong>Requirements:</strong> Demat account, PAN card, bank account with sufficient funds.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                IPO Application Categories
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Retail Individual Investors (RII)</h4>
                    <p>Investment up to ₹2 lakhs. Usually 35% of issue reserved for retail investors.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">High Net Worth Individuals (HNI/NII)</h4>
                    <p>Investment above ₹2 lakhs but below ₹10 crores. Gets 15% of the issue.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Qualified Institutional Buyers (QIB)</h4>
                    <p>Large institutions like mutual funds, insurance companies. Reserved 50% of the issue.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="allotment" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Allotment Process
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">
                  After IPO subscription closes, allotment happens based on demand:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Undersubscribed:</strong> All applicants get full allotment
                  </li>
                  <li>
                    <strong>Oversubscribed (Retail):</strong> Lottery system used, minimum 1 lot guaranteed to some applicants
                  </li>
                  <li>
                    <strong>Oversubscribed (HNI/QIB):</strong> Proportionate allotment based on demand
                  </li>
                </ul>
                <p className="mt-4">
                  Allotment status is typically available 5-7 days after IPO closes.
                  Listing happens 1-2 days after allotment finalization.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="risks" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Risks & Considerations
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-2">Important Disclaimer</p>
                      <p className="text-sm">
                        IPO investments carry market risks. Past performance doesn't guarantee future returns.
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Listing day volatility - prices can swing significantly</li>
                  <li>Lock-in period restrictions for promoters and pre-IPO investors</li>
                  <li>Limited historical data for new companies</li>
                  <li>Market conditions affecting listing gains</li>
                  <li>Overvaluation risks during market euphoria</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* GMP Guide Section */}
        <div id="gmp-guide" className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-section-title font-heading font-bold">Understanding Grey Market Premium (GMP)</h2>
          </div>

          <div className="space-y-6">
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-3">What is GMP?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Grey Market Premium (GMP) is the price at which IPO shares trade in the unofficial grey market
                before they are officially listed on stock exchanges. It indicates market sentiment and expected
                listing gains or losses.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Example:</strong> If an IPO has an issue price of ₹100 and GMP of ₹50, shares are trading
                at ₹150 in the grey market, suggesting potential 50% listing gains.
              </p>
            </div>

            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-3">Key GMP Terminology</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Grey Market Premium (GMP)</h4>
                  <p className="text-sm text-muted-foreground">
                    Premium amount over issue price. Positive GMP suggests expected listing gains.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Kostak Rate</h4>
                  <p className="text-sm text-muted-foreground">
                    Amount paid for buying the application/allotment right without actual shares.
                    Higher kostak indicates strong demand.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Subject to Sauda</h4>
                  <p className="text-sm text-muted-foreground">
                    Price at which sellers are willing to sell shares if allotment is received.
                    Indicates expected listing price.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-3">How to Interpret GMP?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-foreground">High Positive GMP (&gt;20%)</p>
                    <p className="text-sm text-muted-foreground">Strong market demand, potential listing gains expected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-foreground">Moderate GMP (5-20%)</p>
                    <p className="text-sm text-muted-foreground">Decent interest, modest gains possible</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-foreground">Low/Zero GMP (0-5%)</p>
                    <p className="text-sm text-muted-foreground">Limited enthusiasm, flat listing expected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-foreground">Negative GMP</p>
                    <p className="text-sm text-muted-foreground">Weak sentiment, potential listing loss anticipated</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-card">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Important Notes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• GMP is unofficial and not regulated by SEBI</li>
                    <li>• Can be manipulated by operators, use as indicator only</li>
                    <li>• Fluctuates daily based on market conditions</li>
                    <li>• Not a guarantee of actual listing performance</li>
                    <li>• Should be combined with fundamental analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Analysis Section */}
        <div id="market-analysis" className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="w-8 h-8 text-primary" />
            <h2 className="text-section-title font-heading font-bold">IPO Market Analysis Guide</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="fundamental" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Fundamental Analysis
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">Key metrics to evaluate before investing:</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Financial Performance</h4>
                    <p className="text-sm">Revenue growth, profitability trends, debt levels, cash flows</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Valuation Metrics</h4>
                    <p className="text-sm">P/E ratio, P/B ratio, EV/EBITDA compared to industry peers</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Business Model</h4>
                    <p className="text-sm">Competitive advantages, market position, growth potential</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Management Quality</h4>
                    <p className="text-sm">Track record, corporate governance, promoter reputation</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="documents" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Important Documents to Review
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <ul className="space-y-3">
                  <li>
                    <strong className="text-foreground">DRHP (Draft Red Herring Prospectus):</strong> Contains detailed
                    company information, financials, risk factors, and use of proceeds
                  </li>
                  <li>
                    <strong className="text-foreground">RHP (Red Herring Prospectus):</strong> Final document with price band
                    and final terms
                  </li>
                  <li>
                    <strong className="text-foreground">Financial Statements:</strong> Last 3 years audited financials
                  </li>
                  <li>
                    <strong className="text-foreground">Risk Factors:</strong> Potential risks disclosed by the company
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="subscription" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Reading Subscription Data
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">
                  Subscription data shows how many times the IPO was oversubscribed in each category:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">High QIB Subscription (&gt;5x)</p>
                    <p className="text-sm">Institutional confidence, positive signal for listing</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Strong Retail Participation (&gt;3x)</p>
                    <p className="text-sm">Good retail interest, listing day buying possible</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">HNI Subscription</p>
                    <p className="text-sm">High HNI subscription (&gt;10x) shows strong demand from wealthy investors</p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  <strong>Note:</strong> Very high oversubscription may lead to lower allotment chances for retail investors.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="timing" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Market Timing & Conditions
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                <p className="mb-4">Market conditions significantly impact IPO performance:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bull markets tend to produce better listing gains</li>
                  <li>Sector-specific trends affect similar IPOs</li>
                  <li>Recent IPO performance influences new listings</li>
                  <li>Global market conditions and FII flows matter</li>
                  <li>Avoid IPOs during high market volatility</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg border bg-card text-center">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-3">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Explore our platform for live IPO data, detailed analytics, and comparison tools
              to make informed investment decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/calendar" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                View IPO Calendar
              </a>
              <a href="/compare" className="px-6 py-2 rounded-lg border bg-background hover:bg-accent transition-colors font-medium">
                Compare IPOs
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
