import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="relative border-t mt-16 bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">IPOHut</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              India's most comprehensive IPO tracking platform. Get real-time data, grey market premium insights, subscription status, and detailed analysis for all IPOs.
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Subscribe to IPO Alerts</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get instant notifications for new IPOs, listings, and market updates.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/open" className="text-muted-foreground hover:text-foreground transition-colors">
                  Open IPOs
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upcoming & Closed
                </Link>
              </li>
              <li>
                <Link href="/listed" className="text-muted-foreground hover:text-foreground transition-colors">
                  Listed IPOs
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">
                  IPO Calendar
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-foreground transition-colors">
                  Compare IPOs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  IPO Investment Guide
                </a>
              </li>
              <li>
                <a href="#gmp" className="text-muted-foreground hover:text-foreground transition-colors">
                  Understanding GMP
                </a>
              </li>
              <li>
                <a href="#allotment" className="text-muted-foreground hover:text-foreground transition-colors">
                  Allotment Process
                </a>
              </li>
              <li>
                <a href="#analysis" className="text-muted-foreground hover:text-foreground transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@ipohut.com" className="hover:text-foreground transition-colors">
                  info@ipohut.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+911234567890" className="hover:text-foreground transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>

            <h4 className="font-semibold mb-3 text-foreground text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {new Date().getFullYear()} IPOHut. All rights reserved.</p>
            <p className="text-xs mt-1">
              Data updated in real-time • For informational purposes only • Not investment advice
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="#twitter"
              className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#linkedin"
              className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#facebook"
              className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#instagram"
              className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-warning/5 border border-warning/20">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> IPOHut is an information platform only. We do not provide investment advice or recommendations.
            All data is sourced from publicly available information and grey market indicators. Past performance does not guarantee future results.
            Please consult with a registered financial advisor before making any investment decisions. Investment in securities market are subject to market risks.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
