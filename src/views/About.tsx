import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, Target, Users, Shield, BarChart3, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            About IPOHut
          </div>
          <h1 className="text-hero font-heading font-bold mb-6">
            India's Most Comprehensive IPO Information Platform
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            IPOHut provides real-time IPO data, grey market premiums, subscription status, and detailed analytics
            to help investors make informed decisions in the Indian stock market.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-section mb-16">
          <div className="p-section rounded-lg border bg-card">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to IPO information and empower retail investors with institutional-grade
              data and analysis tools, enabling smarter investment decisions in India's growing IPO market.
            </p>
          </div>
          <div className="p-section rounded-lg border bg-card">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted and comprehensive platform for IPO information in India,
              helping millions of investors navigate the public markets with confidence and clarity.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-section-title font-heading font-bold text-center mb-12">Why Choose IPOHut?</h2>
          <div className="grid md:grid-cols-3 gap-card">
            <div className="p-card rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Get live subscription data, GMP updates, and listing performance as they happen.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Analytics</h3>
              <p className="text-muted-foreground">
                Detailed financials, peer comparisons, and historical trends for every IPO.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Data</h3>
              <p className="text-muted-foreground">
                Verified information from official sources including BSE, NSE, and SEBI.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-section-title font-heading font-bold text-center mb-8">What We Offer</h2>
          <div className="space-y-4">
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">IPO Calendar & Tracking</h3>
              <p className="text-muted-foreground">
                Track all upcoming, open, and closed IPOs with detailed timelines and subscription status.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Grey Market Premium (GMP) Data</h3>
              <p className="text-muted-foreground">
                Real-time GMP, kostak rates, and subject-to-sauda prices to gauge market sentiment.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
              <p className="text-muted-foreground">
                Live subscription data across QIB, NII, and Retail categories updated throughout the day.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Listing Performance</h3>
              <p className="text-muted-foreground">
                Track listing day gains, historical performance, and compare IPOs side-by-side.
              </p>
            </div>
            <div className="p-card rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Financial Analysis</h3>
              <p className="text-muted-foreground">
                Detailed financials, valuation metrics, peer comparisons, and DRHP documents.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-section-title font-heading font-bold mb-4">Built by Investors, For Investors</h2>
          <p className="text-muted-foreground leading-relaxed">
            IPOHut is built by a team of market professionals, data analysts, and technology experts
            who understand the challenges retail investors face. We're committed to providing accurate,
            timely, and actionable IPO information to help you make better investment decisions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
