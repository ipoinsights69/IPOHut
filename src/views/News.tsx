"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, TrendingUp, FileText, Calendar, User } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "news" | "analysis" | "commentary" | "regulatory";
  author: string;
  date: string;
  readTime: string;
}

const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "Tech IPOs Dominate Q4 2024: Market Analysis",
    excerpt: "Technology sector leads IPO activity with over 40% market share as investor sentiment remains strong.",
    content: "The technology sector has emerged as the dominant force in Q4 2024 IPO market, accounting for over 40% of all new listings. This trend reflects growing investor confidence in digital transformation and innovative tech solutions. Companies in AI, cloud computing, and fintech have attracted significant retail and institutional participation.",
    category: "analysis",
    author: "Rajesh Kumar",
    date: "Nov 25, 2024",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "SEBI Introduces New Guidelines for IPO Disclosures",
    excerpt: "Regulatory update mandates enhanced transparency for grey market premium information.",
    content: "The Securities and Exchange Board of India (SEBI) has announced new guidelines requiring companies to provide more detailed disclosures about their financials and risk factors. The regulations also address grey market activities, mandating issuers to include disclaimers about unofficial premium trading.",
    category: "regulatory",
    author: "Priya Sharma",
    date: "Nov 24, 2024",
    readTime: "4 min read"
  },
  {
    id: "3",
    title: "Retail Participation Hits Record High in Recent IPOs",
    excerpt: "Individual investors show unprecedented interest with subscription rates exceeding institutional bids.",
    content: "Recent IPO data reveals a significant surge in retail investor participation, with several offerings seeing retail subscription rates surpassing those of institutional investors. This shift indicates growing financial literacy and easier access to capital markets through digital platforms.",
    category: "news",
    author: "Amit Patel",
    date: "Nov 23, 2024",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Market Expert Opinion: What to Watch in Upcoming Listings",
    excerpt: "Industry veterans share insights on evaluating IPO opportunities in the current market climate.",
    content: "Market experts emphasize the importance of fundamental analysis over grey market premium when evaluating IPO investments. Key factors to consider include company fundamentals, sector outlook, management quality, and fair valuation. Experts caution against following herd mentality and recommend thorough due diligence.",
    category: "commentary",
    author: "Dr. Sunita Verma",
    date: "Nov 22, 2024",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "Manufacturing Sector IPOs Show Strong Listing Gains",
    excerpt: "Make in India initiative boosts investor confidence in manufacturing companies going public.",
    content: "Manufacturing companies have delivered impressive listing day gains, with average returns exceeding 25%. The government's Make in India initiative and PLI schemes have created favorable conditions for manufacturing IPOs. Companies in electronics, automotive components, and pharmaceuticals have led the way.",
    category: "news",
    author: "Vikram Singh",
    date: "Nov 21, 2024",
    readTime: "5 min read"
  },
  {
    id: "6",
    title: "Understanding IPO Valuation: A Comprehensive Guide",
    excerpt: "Deep dive into valuation metrics and methodologies for assessing IPO pricing.",
    content: "IPO valuation requires understanding multiple metrics including P/E ratio, EV/EBITDA, and sector comparisons. This comprehensive guide explores how to assess if an IPO is fairly priced, overvalued, or undervalued. We cover comparative analysis, growth projections, and risk assessment frameworks that help investors make informed decisions.",
    category: "analysis",
    author: "Neha Kapoor",
    date: "Nov 20, 2024",
    readTime: "10 min read"
  },
  {
    id: "7",
    title: "SEBI Cracks Down on Unauthorized GMP Platforms",
    excerpt: "Regulatory action taken against platforms facilitating unofficial pre-IPO trading.",
    content: "SEBI has intensified its crackdown on unauthorized platforms facilitating grey market premium trading. The regulator has issued notices to several entities and warned investors about risks associated with unofficial IPO trading. This move aims to protect retail investors and ensure market integrity.",
    category: "regulatory",
    author: "Arjun Mehta",
    date: "Nov 19, 2024",
    readTime: "4 min read"
  },
  {
    id: "8",
    title: "Small Cap IPOs: Hidden Gems or High Risk?",
    excerpt: "Expert analysis on evaluating opportunities in the small and mid-cap IPO segment.",
    content: "Small and mid-cap IPOs offer potential for outsized returns but come with higher risks. This analysis examines successful small-cap listings, common pitfalls to avoid, and due diligence best practices. We explore how to identify quality companies with strong fundamentals in the SME segment.",
    category: "commentary",
    author: "Kavita Reddy",
    date: "Nov 18, 2024",
    readTime: "8 min read"
  }
];

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All News", icon: Newspaper },
    { value: "news", label: "News", icon: Newspaper },
    { value: "analysis", label: "Analysis", icon: TrendingUp },
    { value: "commentary", label: "Commentary", icon: User },
    { value: "regulatory", label: "Regulatory", icon: FileText }
  ];

  const filteredNews = selectedCategory === "all"
    ? newsData
    : newsData.filter(article => article.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "default";
      case "analysis":
        return "secondary";
      case "commentary":
        return "outline";
      case "regulatory":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-section-title font-bold mb-2">IPO News & Insights</h1>
          <p className="text-muted-foreground">
            Latest news, market commentary, expert analysis, and regulatory updates
          </p>
        </div>

        {/* Category Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* News Articles */}
        <div className="grid grid-cols-1 gap-card">
          {filteredNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.author}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <p className="mb-4 leading-relaxed">{article.content}</p>
                <Button variant="outline">Read Full Article</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
