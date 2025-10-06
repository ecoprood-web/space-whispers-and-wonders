import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

import { Sparkles, BookOpen, Image, Users, ArrowRight, Zap, Radio, Eye } from "lucide-react";
import heroImage from "@/assets/hero-space-weather.jpg";
import sunCharacter from "@/assets/sun-character.png";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Interactive Stories",
      description: "Follow Sol the Sun and friends through engaging narratives about space weather",
      link: "http://localhost:8080",
    },
    {
      icon: Eye,
      title: "Visual Learning",
      description: "Stunning imagery and visualizations make complex concepts clear",
      link: "/gallery",
    },
    {
      icon: BookOpen,
      title: "Teacher Resources",
      description: "Complete guides and activities ready for classroom use",
      link: "/teachers",
    },
    {
      icon: Users,
      title: "Community Ideas",
      description: "Share your thoughts and help improve space weather education",
      link: "/feedback",
    },
  ];

  const impacts = [
    { icon: Radio, text: "Communication Systems" },
    { icon: Zap, text: "Power Grids" },
    { icon: Sparkles, text: "Satellites & GPS" },
    { icon: Eye, text: "Aurora Phenomena" },
  ];

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Space Weather" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-aurora bg-clip-text text-transparent">
                Space Weather
              </span>
              <br />
              <span className="text-foreground">Made Simple & Fun</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover how solar eruptions, flares, and charged particles affect Earth 
              through interactive storytelling and real NASA data
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group shadow-glow">
                <Link to="/teachers">
                  Start the Adventure
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/gallery">
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Space Weather */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-aurora animate-slide-up">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl bg-gradient-aurora bg-clip-text text-transparent">
                  What is Space Weather?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-center text-muted-foreground leading-relaxed">
                  Space weather describes the constant interaction between the Sun and Earth. 
                  When the Sun "sneezes" with solar flares and eruptions, it sends clouds of 
                  charged particles hurtling through space. These events can affect satellites, 
                  communications, navigation, power systems—and create stunning auroras!. 
                </p>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {impacts.map((impact, index) => {
                    const Icon = impact.icon;
                    return (
                      <div 
                        key={index}
                        className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                      >
                        <Icon className="h-8 w-8 text-primary" />
                        <p className="text-sm text-center font-medium">{impact.text}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
                Explore & Learn
              </h2>
              <p className="text-xl text-muted-foreground">
                Making space weather accessible, engaging, and fun for everyone
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link key={index} to={feature.link}>
                    <Card className="bg-card/90 backdrop-blur-sm border-primary/20 h-full hover:shadow-glow hover:border-primary/50 transition-all group cursor-pointer">
                      <CardHeader>
                        <Icon className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-aurora/10 border-primary/20 shadow-aurora">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl md:text-4xl">
                  Ready to Explore?
                </CardTitle>
                <CardDescription className="text-lg">
                  Join Sol the Sun and friends on an educational adventure through space weather
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="shadow-glow">
                  <Link to="http://localhost:8080/" target="_blank" rel="noopener noreferrer">
                    Begin Interactive Story
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/teachers">
                    Teacher Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Educational content inspired by NASA and NOAA space weather resources
            </p>
            <p className="text-xs text-muted-foreground">
              Making science accessible and engaging for students and curious minds everywhere
            </p>
          </div>
        </div>
      </footer>
      {/* Floating Chatbot Icon and Dialog */}
      <Chatbot />
    </div>
  );
};

export default Index;
