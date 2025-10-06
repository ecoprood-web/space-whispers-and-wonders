import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Image, Users, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "https://lovable.dev/projects/5e405ffc-1dac-417e-a921-8018895f6352", label: "Interactive Story", icon: Sparkles, external: true },
    { path: "/gallery", label: "Gallery", icon: Image },
    { path: "/teachers", label: "For Teachers", icon: BookOpen },
    { path: "/feedback", label: "Share Ideas", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Space Weather Stories
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              if (item.external) {
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </a>
                  </Button>
                );
              }
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
