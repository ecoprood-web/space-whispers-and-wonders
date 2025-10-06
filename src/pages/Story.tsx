import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import sunCharacter from "@/assets/sun-character.png";
import pilotCharacter from "@/assets/pilot-character.png";
import { Volume2, ArrowRight, Zap, Radio, Lightbulb, Satellite, Shield, Activity, Power, Wifi, Navigation as NavigationIcon, AlertTriangle, Sparkles, Moon, Sun as SunIcon } from "lucide-react";

type Scene = "intro" | "choose-sneeze" | "sneeze" | "cme-journey" | "magnetic-field" | "effects-menu" | "effect-satellites" | "effect-power" | "effect-radio" | "effect-astronauts" | "pilot" | "aurora" | "aurora-science" | "radiation-belts" | "solar-cycle" | "end";

type SceneData = {
  title: string;
  character: string;
  text: string;
  narration: string;
  particles?: boolean;
  interactive?: boolean;
  menu?: boolean;
  simulator?: "satellites" | "power" | "radio" | "aurora" | "magnetic";
  choices: Array<{ text: string; next: Scene; icon?: any }>;
};

const Story = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("intro");
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [cmeStrength, setCmeStrength] = useState(50);
  const [effectsExplored, setEffectsExplored] = useState<string[]>([]);
  const [sunMood, setSunMood] = useState<"happy" | "sneeze" | "proud" | "silly" | "excited" | "worried">("happy");
  
  // Interactive simulator states
  const [satelliteHealth, setSatelliteHealth] = useState(100);
  const [powerGridLoad, setPowerGridLoad] = useState(50);
  const [radioSignal, setRadioSignal] = useState(100);
  const [auroraIntensity, setAuroraIntensity] = useState(30);
  const [magneticFieldStrength, setMagneticFieldStrength] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerParticles = (count = 30) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const simulateSolarStorm = () => {
    setIsSimulating(true);
    triggerParticles(50);
    
    // Simulate effects based on CME strength
    const stormInterval = setInterval(() => {
      const impact = cmeStrength / 100;
      
      setSatelliteHealth(prev => Math.max(0, prev - (impact * 5)));
      setPowerGridLoad(prev => Math.min(100, prev + (impact * 10)));
      setRadioSignal(prev => Math.max(0, prev - (impact * 8)));
      setAuroraIntensity(prev => Math.min(100, prev + (impact * 15)));
      setMagneticFieldStrength(prev => Math.max(50, prev - (impact * 3)));
    }, 100);

    setTimeout(() => {
      clearInterval(stormInterval);
      setIsSimulating(false);
    }, 3000);
  };

  const resetSimulation = () => {
    setSatelliteHealth(100);
    setPowerGridLoad(50);
    setRadioSignal(100);
    setAuroraIntensity(30);
    setMagneticFieldStrength(100);
  };

  const exploreEffect = (effect: string) => {
    if (!effectsExplored.includes(effect)) {
      setEffectsExplored([...effectsExplored, effect]);
    }
  };

  useEffect(() => {
    if (currentScene === "sneeze") {
      setSunMood("sneeze");
      triggerParticles(40);
    } else if (currentScene === "aurora" || currentScene === "aurora-science") {
      setSunMood("proud");
    } else if (currentScene === "intro" || currentScene === "choose-sneeze") {
      setSunMood("silly");
    } else if (currentScene === "cme-journey") {
      setSunMood("excited");
    } else if (currentScene === "effect-astronauts") {
      setSunMood("worried");
    } else {
      setSunMood("happy");
    }
    
    // Reset simulation when entering effect scenes
    if (currentScene.startsWith("effect-")) {
      resetSimulation();
    }
  }, [currentScene]);

  const scenes: Record<Scene, SceneData> = {
    intro: {
      title: "Meet Sol: Your Favorite Star! ⭐",
      character: sunCharacter,
      text: "Heyyy! I'm Sol, but you might know me as THE SUN! 🌟 I've been lighting up your solar system for about 4.6 billion years (but who's counting, right?). Here's a fun secret: I'm basically a giant ball of hot plasma held together by my own gravity. Sounds intense, but it's actually pretty chill... well, except when I sneeze! 😅",
      narration: "Hey! I'm Sol, the Sun! I've been lighting up your solar system for about 4.6 billion years. I'm basically a giant ball of hot plasma held together by my own gravity. Sounds intense, but it's actually pretty chill... well, except when I sneeze!",
      choices: [
        { text: "Wait, the Sun SNEEZES?! 🤧", next: "choose-sneeze" as Scene },
        { text: "Tell me more about yourself first!", next: "solar-cycle" as Scene },
      ],
    },
    "choose-sneeze": {
      title: "About Those Sneezes... 🤧",
      character: sunCharacter,
      text: "Oh yeah! Sometimes I get these MASSIVE sneezes—scientists call them 'Coronal Mass Ejections' (fancy, right?). It's like... imagine holding in a sneeze during a really quiet moment, and then BOOM! But instead of snot, I'm shooting out BILLIONS of tons of charged particles at speeds up to 3,000 km per second! That's like... New York to LA in 1.3 seconds! 🚀💨",
      narration: "Oh yeah! Sometimes I get these massive sneezes—scientists call them Coronal Mass Ejections. I'm shooting out billions of tons of charged particles at speeds up to 3,000 kilometers per second!",
      interactive: true,
      choices: [
        { text: "Make Sol sneeze! 🤧", next: "sneeze" as Scene },
        { text: "What causes these sneezes?", next: "solar-cycle" as Scene },
      ],
    },
    sneeze: {
      title: "ACHOOOO! 💥🌊✨",
      character: sunCharacter,
      text: "AAAACHOOOOOO!!! 💥 Oh man, excuse me! See those particles flying everywhere? That's a Coronal Mass Ejection in action! I just yeeted about a billion tons of plasma into space. Don't worry though—I do this pretty regularly. Sometimes a few times a week, sometimes just once a month. Depends on my mood and where I am in my 11-year activity cycle!",
      narration: "ACHOO! Oh man, excuse me! See those particles flying everywhere? That's a Coronal Mass Ejection in action! I just launched about a billion tons of plasma into space.",
      particles: true,
      choices: [
        { text: "Where are those particles going?", next: "cme-journey" as Scene },
        { text: "Does this happen often?", next: "solar-cycle" as Scene },
      ],
    },
    "cme-journey": {
      title: "The Great Space Journey 🚀",
      character: sunCharacter,
      text: "So these particles—mostly electrons and protons—are now zooming through space at ridiculous speeds! The fast ones take about 15-18 hours to reach Earth (that's 93 million miles away!). The slower ones might take 2-3 days. They're like a cosmic delivery service, except nobody ordered this package! 📦💨",
      narration: "These particles—mostly electrons and protons—are now zooming through space at ridiculous speeds! The fast ones take about 15 to 18 hours to reach Earth. The slower ones might take 2 to 3 days.",
      choices: [
        { text: "What happens when they hit Earth?", next: "magnetic-field" as Scene },
        { text: "Can we see them coming?", next: "effects-menu" as Scene },
      ],
    },
    "magnetic-field": {
      title: "Earth's Invisible Shield! 🛡️",
      character: sunCharacter,
      text: "Plot twist! Earth has a SECRET WEAPON—its magnetic field! It's like an invisible force field (generated by Earth's liquid iron core spinning around) that deflects most of my charged particles. When my particles hit this field, they get redirected toward the poles like water flowing around a rock. That's why auroras happen near the Arctic and Antarctic! The field extends 370,000 miles into space—that's further than the Moon! Without this shield, life on Earth would be... well, crispy. 🔥 Mars lost its magnetic field billions of years ago, and its atmosphere got stripped away by solar wind. Lucky Earth! Try the simulator to see how the magnetic field deflects my particles!",
      narration: "Plot twist! Earth has a secret weapon—its magnetic field! It's like an invisible force field generated by Earth's liquid iron core that deflects most of my charged particles. When my particles hit this field, they get redirected toward the poles.",
      simulator: "magnetic",
      choices: [
        { text: "Show me ALL the effects! 🌎", next: "effects-menu" as Scene },
        { text: "Tell me about the auroras! 🌌", next: "aurora" as Scene },
      ],
    },
    "effects-menu": {
      title: "Choose Your Space Weather Adventure! 🎮",
      character: sunCharacter,
      text: "Alright, let's explore what happens when I sneeze! My CMEs affect Earth in SO many ways. Click on any effect below to learn more. Try to explore them all—each one is wild in its own way! 🌍⚡",
      narration: "Let's explore what happens when I sneeze! My CMEs affect Earth in so many ways. Click on any effect below to learn more.",
      menu: true,
      choices: [
        { text: "📡 Satellites & GPS", next: "effect-satellites" as Scene, icon: Satellite },
        { text: "⚡ Power Grids", next: "effect-power" as Scene, icon: Zap },
        { text: "📻 Radio Communications", next: "effect-radio" as Scene, icon: Radio },
        { text: "🧑‍🚀 Astronauts in Space", next: "effect-astronauts" as Scene, icon: Shield },
        { text: "✈️ Aviation & Pilots", next: "pilot" as Scene, icon: Activity },
        { text: "🌌 Aurora Lights!", next: "aurora" as Scene, icon: Lightbulb },
      ],
    },
    "effect-satellites": {
      title: "Satellites: The Sitting Ducks 🛰️",
      character: sunCharacter,
      text: "Okay, so satellites are basically sitting in space with NO protection (poor things). When my charged particles hit them, it's like a cosmic static shock! ⚡ Their electronics can glitch, solar panels get damaged, and sometimes they even tumble out of control. In 2022, SpaceX lost 40 Starlink satellites to one of my stronger sneezes—they just couldn't handle the increased atmospheric drag. Oops! 😅 GPS satellites can give wrong positions (up to 10 meters off), which is BAD if you're landing a plane! Try the simulator below to see what happens!",
      narration: "Satellites are basically sitting in space with no protection. When my charged particles hit them, their electronics can glitch, solar panels get damaged, and sometimes they even tumble out of control. GPS satellites can give wrong positions up to 10 meters off.",
      simulator: "satellites",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "What about power grids?", next: "effect-power" as Scene },
      ],
    },
    "effect-power": {
      title: "Lights Out! The Power Grid Problem ⚡🔌",
      character: sunCharacter,
      text: "Here's where it gets REALLY dramatic! When my particles hit Earth's magnetic field, they create electric currents in the ground—like, literally electricity flowing through the dirt! These currents can overload transformers in power grids. In 1989, my sneeze knocked out power to 6 MILLION people in Quebec for 9 hours! 🔦 Modern transformers can handle small events, but a really big sneeze could cause blackouts lasting weeks or months. The Carrington Event of 1859 was so powerful, telegraph wires caught fire! Imagine that happening to today's power grid... chaos! Adjust the solar storm intensity and watch what happens to the power grid!",
      narration: "When my particles hit Earth's magnetic field, they create electric currents in the ground that can overload transformers in power grids. In 1989, my sneeze knocked out power to 6 million people in Quebec for 9 hours!",
      simulator: "power",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "What about radio?", next: "effect-radio" as Scene },
      ],
    },
    "effect-radio": {
      title: "Radio Silence 📻🔇",
      character: sunCharacter,
      text: "You know how radio waves bounce off the ionosphere to travel long distances? Well, my particles MESS with that layer! Suddenly, radio signals get absorbed instead of reflected. Ham radio operators call this a 'radio blackout.' Military communications can fail, emergency services struggle, and even your car's GPS voice might ghost you mid-turn! The blackout can last from minutes to hours depending on how strong my sneeze was. Airlines can't communicate with control towers, ships lose navigation, and emergency responders can't coordinate. It's like the entire planet goes on 'Do Not Disturb' mode! 📡❌ Watch the signal strength drop as solar particles hit!",
      narration: "My particles mess with the ionosphere! Radio signals get absorbed instead of reflected. Military communications can fail, emergency services struggle, and GPS might stop working.",
      simulator: "radio",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "What about astronauts?!", next: "effect-astronauts" as Scene },
      ],
    },
    "effect-astronauts": {
      title: "Danger Zone: Astronauts! 🧑‍🚀☢️",
      character: sunCharacter,
      text: "Okay, this is where I feel bad... 😬 Astronauts in space don't have Earth's magnetic field to protect them. My high-energy particles can cause radiation sickness, increase cancer risk, and even damage their eyes (some report seeing flashes!). During major solar storms, astronauts on the ISS have to hide in special shielded areas. If humans go to Mars, this is a HUGE problem because the trip takes months and Mars has almost no magnetic field. Space agencies are designing radiation shelters just because of me!",
      narration: "Astronauts in space don't have Earth's magnetic field to protect them. My high-energy particles can cause radiation sickness and increase cancer risk. During major solar storms, astronauts have to hide in special shielded areas.",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "Show me something beautiful!", next: "aurora" as Scene },
      ],
    },
    pilot: {
      title: "Up in the Air: A Pilot's Perspective ✈️",
      character: pilotCharacter,
      text: "Captain Rivera here! ✈️ So when Sol has one of his 'episodes,' we pilots have to adapt fast. At cruising altitude (35,000 feet), we're above most of the atmosphere—closer to space than ground! During solar storms, we get: 1) GPS errors (not great for landing!), 2) Radio static and dropouts (can't talk to control tower!), 3) Increased radiation exposure (frequent flyers get more radiation than X-ray techs!). We have to reroute flights away from polar routes where the effects are strongest. It adds time and fuel costs, but safety first!",
      narration: "Captain Rivera here! During solar storms, we pilots get GPS errors, radio static and dropouts, and increased radiation exposure. We have to reroute flights away from polar routes where the effects are strongest.",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "What about the auroras?", next: "aurora" as Scene },
      ],
    },
    aurora: {
      title: "Aurora Magic: Nature's Light Show! 🌈✨",
      character: sunCharacter,
      text: "Okay, NOW for my favorite part—THE AURORAS! 🎨 When my charged particles collide with oxygen and nitrogen in Earth's upper atmosphere (60-200 miles up), they make those atoms GLOW! It's like a cosmic neon sign! Oxygen creates the green and red colors, nitrogen makes blue and purple. The lights dance and shimmer because the magnetic field is constantly shifting. It's literally me painting the sky with physics! Sometimes they're so bright you can read a book by their light! During the strongest storms, auroras can be seen as far south as Mexico or the Mediterranean! Indigenous peoples called them 'dancing spirits,' Vikings thought they were reflections from Valkyrie armor, and some thought they heard them crackle and hiss! Use the simulator to control the aurora intensity!",
      narration: "When my charged particles collide with oxygen and nitrogen in Earth's upper atmosphere, they make those atoms glow! Oxygen creates the green and red colors, nitrogen makes blue and purple.",
      simulator: "aurora",
      choices: [
        { text: "Tell me MORE about the science!", next: "aurora-science" as Scene },
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "What about radiation belts?", next: "radiation-belts" as Scene },
      ],
    },
    "aurora-science": {
      title: "Aurora Science Deep Dive 🔬🌌",
      character: sunCharacter,
      text: "Science time! 🤓 Here's what's happening: My electrons (traveling at 45 million mph!) slam into atmospheric gases. This excites the atoms, giving them extra energy. When they calm down, they release that energy as LIGHT—photons! Different gases and altitudes create different colors: Green (oxygen at 60-150 miles), Red (oxygen above 150 miles), Blue/Purple (nitrogen). The 'curtain' effect happens because particles follow magnetic field lines, creating vertical stripes. Indigenous peoples have stories about auroras for thousands of years—some thought they were spirits dancing!",
      narration: "My electrons slam into atmospheric gases, exciting the atoms. When they calm down, they release that energy as light—photons! Different gases and altitudes create different colors.",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "Continue the journey", next: "radiation-belts" as Scene },
      ],
    },
    "radiation-belts": {
      title: "The Radiation Belt Mystery 🎯",
      character: sunCharacter,
      text: "Fun fact! Earth has these donut-shaped zones of trapped radiation called the Van Allen Belts (discovered in 1958). They're like my particles getting caught in Earth's magnetic field and going in circles forever! There are two main belts: inner (600-3,700 miles up) and outer (12,000-25,000 miles up). Satellites have to navigate through these carefully. Too much time in the belts = fried electronics! These belts actually protect Earth by trapping dangerous particles before they hit the surface. Thanks, magnetic field! 🙏",
      narration: "Earth has donut-shaped zones of trapped radiation called the Van Allen Belts. They're like my particles getting caught in Earth's magnetic field and going in circles forever!",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "Tell me about your cycles", next: "solar-cycle" as Scene },
      ],
    },
    "solar-cycle": {
      title: "My 11-Year Mood Swings 🌞📅",
      character: sunCharacter,
      text: "So here's the deal: I go through an 11-year cycle! At 'solar minimum,' I'm pretty chill—maybe one CME per week, few sunspots. But at 'solar maximum' (like in 2024-2025), I'm CRANKY! I can sneeze multiple times a day, and I get covered in sunspots (they're like acne but magnetic!). Right now we're heading toward a peak! This cycle is driven by my magnetic field flipping—yes, my north and south poles swap every 11 years! Scientists use this to predict space weather. We're getting better at forecasting, but I can still surprise them! 😏",
      narration: "I go through an 11-year cycle! At solar minimum, I'm pretty chill. But at solar maximum, I can sneeze multiple times a day, and I get covered in sunspots.",
      choices: [
        { text: "Back to effects menu", next: "effects-menu" as Scene },
        { text: "Wrap this up!", next: "end" as Scene },
      ],
    },
    end: {
      title: "Space Weather: The Big Picture 🌍🌌",
      character: sunCharacter,
      text: "So there you have it! Space weather is REAL and it affects everything: your GPS, your power, your internet, even astronauts! 🛰️⚡ Organizations like NOAA's Space Weather Prediction Center and NASA's Solar Dynamics Observatory watch me 24/7 to forecast when I might sneeze next. Understanding space weather helps protect our technology-dependent world while still enjoying nature's most spectacular shows! Thanks for hanging out with me—I hope you learned something cool! And hey, next time you see an aurora, remember: that's ME saying hello! 👋✨",
      narration: "Space weather is real and it affects everything! Organizations like NOAA's Space Weather Prediction Center watch me 24 by 7 to forecast when I might sneeze next.",
      choices: [
        { text: "🔄 Start Over", next: "intro" as Scene },
        { text: "📊 See my score!", next: "end" as Scene },
      ],
    },
  };

  const scene = scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-space relative overflow-hidden">
      <Navigation />
      
      {/* Animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 bg-solar rounded-full animate-fade-in opacity-80"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `fade-in 0.5s ease-out ${particle.delay}s, float 3s ease-in-out ${particle.delay}s`,
            boxShadow: "0 0 10px hsl(var(--solar))",
          }}
        />
      ))}
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-6 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Story Progress</span>
              <span className="text-sm text-primary font-semibold">
                {effectsExplored.length} effects explored
              </span>
            </div>
            <Progress value={(effectsExplored.length / 6) * 100} className="h-2" />
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-glow animate-fade-in">
            <CardHeader className="text-center relative">
              <div className="flex justify-center mb-4 relative">
                <div className="relative">
                  <img 
                    src={scene.character} 
                    alt={scene.title}
                    className={`w-40 h-40 object-contain transition-all duration-500 ${
                      sunMood === "sneeze" ? "animate-pulse-glow scale-125 rotate-12" : 
                      sunMood === "excited" ? "animate-float scale-110" :
                      sunMood === "worried" ? "opacity-80 scale-95" :
                      sunMood === "silly" ? "animate-shimmer" : "animate-float"
                    }`}
                    style={{
                      filter: sunMood === "proud" ? "drop-shadow(0 0 30px hsl(var(--aurora-green)))" : 
                              sunMood === "sneeze" ? "drop-shadow(0 0 40px hsl(var(--solar)))" :
                              sunMood === "excited" ? "drop-shadow(0 0 20px hsl(var(--primary)))" :
                              "drop-shadow(0 0 10px hsl(var(--primary) / 0.3))"
                    }}
                  />
                  {sunMood === "sneeze" && (
                    <div className="absolute inset-0 animate-ping opacity-20 bg-solar rounded-full" />
                  )}
                </div>
                {scene.particles && (
                  <Badge className="absolute top-0 right-0 bg-solar text-foreground animate-pulse">
                    CME Active!
                  </Badge>
                )}
                {isSimulating && (
                  <Badge className="absolute bottom-0 left-0 bg-destructive text-destructive-foreground animate-pulse">
                    Storm in Progress!
                  </Badge>
                )}
              </div>
              <CardTitle className="text-3xl md:text-4xl bg-gradient-aurora bg-clip-text text-transparent">
                {scene.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Click the speaker to hear the story! 🔊
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 relative border border-primary/10">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 hover:scale-110 transition-transform"
                  onClick={() => speakText(scene.narration)}
                >
                  <Volume2 className="h-5 w-5 text-primary" />
                </Button>
                <p className="text-lg leading-relaxed text-foreground pr-12">
                  {scene.text}
                </p>
              </div>

              {/* Interactive CME strength slider */}
              {scene.interactive && (
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 space-y-4 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground">
                      ⚡ Adjust CME Strength
                    </label>
                    <Badge variant="secondary" className="text-lg px-3">{cmeStrength}%</Badge>
                  </div>
                  <Slider
                    value={[cmeStrength]}
                    onValueChange={(value) => setCmeStrength(value[0])}
                    min={10}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className={`p-2 rounded ${cmeStrength < 30 ? 'bg-green-500/20 border border-green-500' : 'bg-muted'}`}>
                      🟢 Weak<br/>(10-29%)
                    </div>
                    <div className={`p-2 rounded ${cmeStrength >= 30 && cmeStrength < 70 ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-muted'}`}>
                      🟡 Moderate<br/>(30-69%)
                    </div>
                    <div className={`p-2 rounded ${cmeStrength >= 70 ? 'bg-red-500/20 border border-red-500' : 'bg-muted'}`}>
                      🔴 Extreme<br/>(70-100%)
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center font-semibold">
                    {cmeStrength < 30 && "Minor satellite glitches, beautiful auroras"}
                    {cmeStrength >= 30 && cmeStrength < 70 && "GPS errors, radio disruptions, power fluctuations"}
                    {cmeStrength >= 70 && "MASSIVE BLACKOUTS! Satellite failures! Spectacular auroras!"}
                  </p>
                  <Button
                    onClick={() => {
                      triggerParticles(50);
                      setSunMood("sneeze");
                      setTimeout(() => setCurrentScene("sneeze"), 500);
                    }}
                    className="w-full group"
                    size="lg"
                  >
                    <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    TRIGGER THE SNEEZE!
                  </Button>
                </div>
              )}

              {/* Interactive Simulators */}
              {scene.simulator && (
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border-2 border-primary/30 space-y-4 animate-slide-up">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      🎮 Interactive Simulator
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Adjust the solar storm intensity and watch the effects in real-time!
                    </p>
                  </div>

                  {/* Satellite Simulator */}
                  {scene.simulator === "satellites" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((sat) => (
                          <div key={sat} className="text-center">
                            <Satellite 
                              className={`mx-auto h-12 w-12 transition-all duration-300 ${
                                satelliteHealth > 66 ? "text-green-500" :
                                satelliteHealth > 33 ? "text-yellow-500 animate-pulse" :
                                "text-red-500 animate-bounce"
                              }`}
                              style={{
                                transform: satelliteHealth < 50 ? `rotate(${Math.random() * 30 - 15}deg)` : "none"
                              }}
                            />
                            <p className="text-xs mt-2 text-muted-foreground">Sat-{sat}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Satellite Health:</span>
                          <Badge variant={satelliteHealth > 66 ? "default" : satelliteHealth > 33 ? "secondary" : "destructive"}>
                            {Math.round(satelliteHealth)}%
                          </Badge>
                        </div>
                        <Progress value={satelliteHealth} className="h-3" />
                      </div>
                    </div>
                  )}

                  {/* Power Grid Simulator */}
                  {scene.simulator === "power" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-3">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="text-center">
                            <Power 
                              className={`mx-auto h-10 w-10 transition-all duration-300 ${
                                powerGridLoad < 70 ? "text-green-500" :
                                powerGridLoad < 90 ? "text-yellow-500 animate-pulse" :
                                i % 2 === 0 ? "text-red-500" : "text-muted animate-pulse"
                              }`}
                            />
                            <Lightbulb 
                              className={`mx-auto h-6 w-6 mt-1 transition-all ${
                                (powerGridLoad > 90 && i % 2 === 0) ? "text-muted opacity-30" : "text-yellow-400"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Grid Load:</span>
                          <Badge variant={powerGridLoad < 70 ? "default" : powerGridLoad < 90 ? "secondary" : "destructive"}>
                            {Math.round(powerGridLoad)}%
                          </Badge>
                        </div>
                        <Progress value={powerGridLoad} className="h-3" />
                        {powerGridLoad > 90 && (
                          <p className="text-xs text-destructive font-semibold text-center animate-pulse">
                            ⚠️ BLACKOUT IN PROGRESS!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Radio Simulator */}
                  {scene.simulator === "radio" && (
                    <div className="space-y-4">
                      <div className="flex justify-center items-center gap-8">
                        <div className="text-center">
                          <Radio className="mx-auto h-16 w-16 text-primary" />
                          <p className="text-xs mt-2">Transmitter</p>
                        </div>
                        <div className="flex-1 relative h-16">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary rounded-full"
                              style={{
                                left: `${i * 20}%`,
                                opacity: radioSignal > (i * 20) ? 0.8 - (i * 0.15) : 0.1,
                                animation: radioSignal > 50 ? "pulse 1s ease-in-out infinite" : "none",
                                animationDelay: `${i * 0.2}s`
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-center">
                          <Wifi className={`mx-auto h-16 w-16 ${radioSignal > 50 ? "text-green-500" : "text-red-500"}`} />
                          <p className="text-xs mt-2">Receiver</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Signal Strength:</span>
                          <Badge variant={radioSignal > 66 ? "default" : radioSignal > 33 ? "secondary" : "destructive"}>
                            {Math.round(radioSignal)}%
                          </Badge>
                        </div>
                        <Progress value={radioSignal} className="h-3" />
                        {radioSignal < 30 && (
                          <p className="text-xs text-destructive font-semibold text-center animate-pulse">
                            📵 RADIO BLACKOUT!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Aurora Simulator */}
                  {scene.simulator === "aurora" && (
                    <div className="space-y-4">
                      <div className="relative h-40 bg-gradient-to-b from-indigo-950 to-purple-950 rounded-lg overflow-hidden">
                        <div className="absolute inset-0">
                          <div 
                            className="aurora-wave"
                            style={{
                              opacity: auroraIntensity / 100,
                              height: `${auroraIntensity}%`,
                              background: `linear-gradient(180deg, 
                                hsl(var(--aurora-green)) 0%, 
                                hsl(var(--aurora-blue)) 50%,
                                hsl(var(--aurora-purple)) 100%)`,
                              filter: "blur(20px)",
                              animation: "float 3s ease-in-out infinite"
                            }}
                          />
                        </div>
                        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-black to-transparent" />
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          {auroraIntensity > 70 && (
                            <span className="text-white text-xs animate-pulse">✨ Visible to the naked eye! ✨</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Aurora Intensity:</span>
                          <Badge variant={auroraIntensity > 66 ? "default" : "secondary"}>
                            {Math.round(auroraIntensity)}%
                          </Badge>
                        </div>
                        <Progress value={auroraIntensity} className="h-3" />
                      </div>
                    </div>
                  )}

                  {/* Magnetic Field Simulator */}
                  {scene.simulator === "magnetic" && (
                    <div className="space-y-4">
                      <div className="relative h-40 bg-gradient-to-b from-blue-950 to-blue-900 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div 
                            className="w-20 h-20 rounded-full bg-blue-500 relative"
                            style={{
                              boxShadow: `0 0 ${magneticFieldStrength / 2}px hsl(var(--primary))`
                            }}
                          >
                            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
                          </div>
                          {[...Array(8)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute w-2 h-2 bg-solar rounded-full"
                              style={{
                                top: `${50 + Math.sin(i * Math.PI / 4) * (50 - magneticFieldStrength / 3)}%`,
                                left: `${50 + Math.cos(i * Math.PI / 4) * (50 - magneticFieldStrength / 3)}%`,
                                opacity: 0.8,
                                animation: `orbit ${3 + i * 0.5}s linear infinite`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Magnetic Field Strength:</span>
                          <Badge variant={magneticFieldStrength > 75 ? "default" : "secondary"}>
                            {Math.round(magneticFieldStrength)}%
                          </Badge>
                        </div>
                        <Progress value={magneticFieldStrength} className="h-3" />
                        <p className="text-xs text-center text-muted-foreground">
                          Particles are being deflected to the poles!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Control buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={simulateSolarStorm}
                      disabled={isSimulating}
                      className="flex-1"
                      size="lg"
                      variant={isSimulating ? "secondary" : "default"}
                    >
                      {isSimulating ? (
                        <>
                          <Activity className="mr-2 h-5 w-5 animate-spin" />
                          Storm Active...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-5 w-5" />
                          Launch Solar Storm!
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetSimulation}
                      variant="outline"
                      size="lg"
                    >
                      Reset
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      💡 The CME strength setting affects all simulations!
                    </p>
                  </div>
                </div>
              )}

              {/* Effects menu grid */}
              {scene.menu && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scene.choices.map((choice, index) => {
                    const Icon = choice.icon || ArrowRight;
                    const explored = effectsExplored.includes(choice.text);
                    return (
                      <Button
                        key={index}
                        onClick={() => {
                          setCurrentScene(choice.next);
                          exploreEffect(choice.text);
                        }}
                        className={`h-auto p-6 justify-start group relative overflow-hidden ${
                          explored ? "border-2 border-secondary" : ""
                        }`}
                        variant={explored ? "secondary" : "default"}
                        size="lg"
                      >
                        <div className="flex items-center w-full">
                          <Icon className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                          <span className="text-left flex-1">{choice.text}</span>
                          {explored && (
                            <Badge className="ml-2 bg-secondary-foreground text-secondary text-xs">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Regular choices */}
              {!scene.menu && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground text-center">
                    What would you like to explore next?
                  </p>
                  <div className="grid gap-3">
                    {scene.choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => setCurrentScene(choice.next)}
                        className="w-full justify-between group hover:shadow-glow transition-all"
                        size="lg"
                      >
                        <span>{choice.text}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fun facts section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 animate-shimmer">
                <p className="text-sm text-foreground text-center">
                  💡 <strong>Did you know?</strong>{" "}
                  {currentScene === "intro" && "The Sun converts 4 million tons of matter into energy every second!"}
                  {currentScene === "sneeze" && "The fastest CME ever recorded traveled at 3,000 km/s!"}
                  {currentScene === "effect-satellites" && "SpaceX lost 40 satellites in Feb 2022 due to a solar storm!"}
                  {currentScene === "effect-power" && "The 1989 Quebec blackout left 6 million people without power!"}
                  {currentScene === "aurora" && "Auroras can be 600 miles wide and 60-600 miles above Earth!"}
                  {!["intro", "sneeze", "effect-satellites", "effect-power", "aurora"].includes(currentScene) && 
                    "Solar storms can affect up to 1,000 satellites at once!"}
                </p>
              </div>

              {/* Completion badge */}
              {effectsExplored.length >= 6 && currentScene === "end" && (
                <div className="p-6 bg-gradient-aurora rounded-lg text-center animate-scale-in">
                  <h3 className="text-2xl font-bold text-background mb-2">
                    🏆 Space Weather Expert!
                  </h3>
                  <p className="text-background/90">
                    You've explored all major effects! You're now a certified Sol's friend! ⭐
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Story;
