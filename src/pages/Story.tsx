import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import sunCharacter from "@/assets/sun-character.png";
import pilotCharacter from "@/assets/pilot-character.png";
import { Volume2, ArrowRight } from "lucide-react";

type Scene = "intro" | "sneeze" | "pilot" | "aurora" | "end";

const Story = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("intro");

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const scenes = {
    intro: {
      title: "A Day in Space",
      character: sunCharacter,
      text: "Hi there! I'm Sol, your friendly neighborhood Sun! You know what? Sometimes I get a little... sneezy. Want to know what happens when a star sneezes?",
      narration: "Hi there! I'm Sol, your friendly neighborhood Sun! You know what? Sometimes I get a little sneezy. Want to know what happens when a star sneezes?",
      choices: [
        { text: "Tell me about your sneeze!", next: "sneeze" as Scene },
        { text: "What causes star sneezes?", next: "sneeze" as Scene },
      ],
    },
    sneeze: {
      title: "The Solar Sneeze",
      character: sunCharacter,
      text: "ACHOO! 💥 Oops! When I sneeze, I send out clouds of charged particles—electrons and protons—zooming through space at incredible speeds! Scientists call this a 'coronal mass ejection' or CME. These particles travel millions of miles toward Earth!",
      narration: "ACHOO! Oops! When I sneeze, I send out clouds of charged particles zooming through space at incredible speeds! Scientists call this a coronal mass ejection. These particles travel millions of miles toward Earth!",
      choices: [
        { text: "What happens when they reach Earth?", next: "pilot" as Scene },
        { text: "How fast do they travel?", next: "pilot" as Scene },
      ],
    },
    pilot: {
      title: "The Pilot's View",
      character: pilotCharacter,
      text: "Captain Rivera here, flying at 35,000 feet. When Sol sneezes, it affects our communication systems and navigation! GPS signals can get fuzzy, and radio communications might crackle. We have to reroute flights over the poles to avoid the strongest effects. It's like the sky itself is buzzing with energy!",
      narration: "Captain Rivera here, flying at 35,000 feet. When Sol sneezes, it affects our communication systems and navigation! GPS signals can get fuzzy, and radio communications might crackle. We have to reroute flights over the poles to avoid the strongest effects.",
      choices: [
        { text: "What about the beautiful lights?", next: "aurora" as Scene },
        { text: "Is it dangerous?", next: "aurora" as Scene },
      ],
    },
    aurora: {
      title: "Aurora Magic",
      character: sunCharacter,
      text: "The best part? When my charged particles hit Earth's magnetic field, they create the most beautiful light show—the Aurora Borealis (Northern Lights) and Aurora Australis (Southern Lights)! The particles collide with gases in the atmosphere, making them glow in brilliant greens, purples, and reds. It's my way of painting the sky!",
      narration: "The best part? When my charged particles hit Earth's magnetic field, they create the most beautiful light show the Aurora! The particles collide with gases in the atmosphere, making them glow in brilliant greens, purples, and reds.",
      choices: [
        { text: "Show me more effects", next: "end" as Scene },
        { text: "What else should we know?", next: "end" as Scene },
      ],
    },
    end: {
      title: "Understanding Space Weather",
      character: sunCharacter,
      text: "Space weather affects so many things: satellite communications, power grids, GPS systems, and even astronauts in space! Scientists at NASA and NOAA constantly monitor my activity to predict when I might sneeze next. Understanding space weather helps keep everyone safe while letting us all enjoy nature's most spectacular light shows!",
      narration: "Space weather affects so many things: satellite communications, power grids, GPS systems, and even astronauts in space! Scientists constantly monitor solar activity to predict the next event.",
      choices: [
        { text: "Start Over", next: "intro" as Scene },
      ],
    },
  };

  const scene = scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-glow animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src={scene.character} 
                  alt={scene.title}
                  className="w-32 h-32 object-contain animate-float"
                />
              </div>
              <CardTitle className="text-3xl bg-gradient-aurora bg-clip-text text-transparent">
                {scene.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Click the speaker to hear the story!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => speakText(scene.narration)}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                <p className="text-lg leading-relaxed text-foreground">
                  {scene.text}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground text-center">
                  What would you like to explore next?
                </p>
                <div className="grid gap-3">
                  {scene.choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentScene(choice.next)}
                      className="w-full justify-between group"
                      size="lg"
                    >
                      <span>{choice.text}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground text-center">
                  💡 <strong>Did you know?</strong> Solar storms can affect up to 1,000 satellites at once!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Story;
