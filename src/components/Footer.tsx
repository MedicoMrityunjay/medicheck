import { Link } from "react-router-dom";
import { Heart, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Research Papers", href: "/research" },
      { name: "Clinical Guidelines", href: "/guidelines" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-background/50 backdrop-blur-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="orb orb-primary w-[400px] h-[400px] -bottom-60 -left-40 opacity-30" />
        <div className="orb orb-accent w-[300px] h-[300px] -bottom-40 right-0 opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Newsletter - Moved to top */}
        <div className="glass-strong rounded-2xl p-8 mb-12 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Get the latest drug safety updates and new feature announcements.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="gradient-primary text-primary-foreground shadow-glow-sm hover:shadow-neon rounded-xl font-semibold whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="lg" showTagline={true} />
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Advanced drug interaction analysis powered by AI. Helping healthcare 
              professionals and patients make safer medication decisions.
            </p>
            
            {/* Social Links - Twitter removed */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-glow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} MediCheck. For research and educational purposes only.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-destructive animate-pulse" /> for safer healthcare
            </p>
            <span className="hidden sm:block">•</span>
            <p className="flex items-center gap-1">
              Developed by <span className="font-semibold text-primary">Mrityunjay Kumar</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
