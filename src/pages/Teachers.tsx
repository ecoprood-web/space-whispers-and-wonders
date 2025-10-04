import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Users, Lightbulb, Target, CheckCircle } from "lucide-react";

const Teachers = () => {
  const learningObjectives = [
    "Understand what space weather is and how it originates from the Sun",
    "Recognize the effects of solar activity on Earth's technology and communications",
    "Explain the connection between solar particles and aurora phenomena",
    "Appreciate the importance of space weather monitoring and prediction",
  ];

  const activities = [
    {
      title: "Interactive Story Exploration",
      icon: BookOpen,
      description: "Guide students through the character-driven narrative, pausing to discuss key concepts",
      duration: "20-30 minutes",
    },
    {
      title: "Cause and Effect Mapping",
      icon: Target,
      description: "Create visual diagrams connecting solar events to Earth-based effects",
      duration: "15-20 minutes",
    },
    {
      title: "NASA Data Investigation",
      icon: Users,
      description: "Explore real-time data from NASA and NOAA resources in the gallery section",
      duration: "25-35 minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Teacher's Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Resources for bringing space weather education to your classroom
            </p>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-glow animate-slide-up">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl">About This Resource</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Space Weather Stories transforms complex scientific concepts into an engaging, 
                character-driven narrative that makes learning about solar-terrestrial interactions 
                accessible and memorable for students of all ages.
              </p>
              <p className="text-foreground leading-relaxed">
                This interactive platform combines storytelling, real NASA data, and hands-on 
                exploration to help students understand how events on the Sun affect life on Earth.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle>Learning Objectives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {learningObjectives.map((objective, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-secondary" />
                  <CardTitle>Recommended Grade Levels</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold text-primary">Primary Audience: Grades 5-8</p>
                  <p className="text-sm text-muted-foreground">
                    Core content aligns with middle school science standards
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-secondary">Extended Use: Grades 3-12</p>
                  <p className="text-sm text-muted-foreground">
                    Adaptable for younger students (simplified) or high school (deeper analysis)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-aurora bg-clip-text text-transparent">
              Suggested Classroom Activities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <Card 
                    key={index} 
                    className="bg-card/90 backdrop-blur-sm border-primary/20 hover:shadow-aurora transition-all"
                  >
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <CardDescription className="text-xs text-accent">
                        {activity.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Discussion Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>What are some ways that space weather affects our daily lives?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Why is it important for scientists to monitor and predict space weather?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>How do you think space weather might become more important in the future?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>What surprised you most about how the Sun affects Earth?</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-aurora/10 border-primary/20">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Official Educational Materials:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• NASA Space Weather Education Resources</li>
                  <li>• NOAA Space Weather Curriculum Guides</li>
                  <li>• Real-time space weather data and forecasts</li>
                </ul>
              </div>
              <Button className="w-full sm:w-auto" variant="default">
                <Download className="h-4 w-4 mr-2" />
                Download Lesson Plan (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Teachers;
