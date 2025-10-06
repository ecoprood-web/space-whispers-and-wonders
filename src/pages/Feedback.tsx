import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Users } from "lucide-react";

const Feedback = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    feedback: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formBody = new URLSearchParams(formData).toString();
    fetch("https://formsubmit.co/amrloksha151@proton.me", {
      method: "POST",
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      },
      body: formBody,
    });
    toast({
      title: "Thank you for your feedback!",
      description: "Your ideas help us improve space weather education for everyone.",
    });

    setFormData({ name: "", email: "", role: "", feedback: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <Users className="h-16 w-16 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Share Your Ideas
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us make space weather education better for everyone!
            </p>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-glow animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">We'd Love to Hear From You</CardTitle>
              <CardDescription className="text-base">
                Your feedback, ideas, and suggestions help us create better educational content. 
                Whether you're a teacher, student, or space enthusiast, we want to know what works 
                and what we can improve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Teacher, Student, Parent, Space Enthusiast, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback & Ideas</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Share your thoughts, suggestions, or ideas for improving space weather education..."
                    rows={8}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tell us what you liked, what could be better, or what topics you'd like to see covered!
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card/90 backdrop-blur-sm border-secondary/20">
            <CardHeader>
              <CardTitle>What We're Looking For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Ideas for new story scenarios or characters</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Suggestions for additional interactive features</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Feedback on clarity and educational value</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Topics or phenomena you'd like to learn more about</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Ways to make the content more accessible</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
