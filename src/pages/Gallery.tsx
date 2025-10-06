import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import aurora from "@/assets/aurora.jpg";
import heroImage from "@/assets/magentic-field.jpg";
import { url } from "inspector";

const Gallery = () => {
  const images = [
    {
      src: heroImage,
      title: "Solar Flare and Earth",
      description: "depiction of the Sun magnetic fields is overlaid on an image of the Sun captured in extreme ultraviolet light by NASA Solar Dynamics Observatory on",
      credit: "NASA/SDO and the AIA, EVE, and HMI scilence teams",
    },
    {
      src: aurora,
      title: "Aurora Borealis",
      description: "The stunning result of charged particles interacting with Earth's atmosphere",
    },
  ];

  const nasaResources = [
    {
      title: "NASA Space Weather",
      description: "Real-time data and images from NASA",
      url: "https://science.nasa.gov/heliophysics/focus-areas/space-weather/",
    },
    {
      title: "NOAA Space Weather Prediction Center",
      description: "Current space weather conditions and forecasts",
      url: "https://www.swpc.noaa.gov/",
    },
    {
      title: "NASA SDO (Solar Dynamics Observatory)",
      description: "Live images of the Sun",
      url: "https://sdo.gsfc.nasa.gov/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Space Weather Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore stunning visualizations and real NASA data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            {images.map((image, index) => (
              <Card key={index} className="bg-card/90 backdrop-blur-sm border-primary/20 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader>
                  <CardTitle className="text-primary">{image.title}</CardTitle>
                  <CardDescription>{image.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Credit: {image.credit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-aurora bg-clip-text text-transparent">
              Official NASA & NOAA Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {nasaResources.map((resource, index) => (
                <Card 
                  key={index} 
                  className="bg-card/90 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-cosmic hover:text-secondary transition-colors underline"
                    >
                      Visit Resource →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Image Attribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                All educational visualizations on this page are created for learning purposes. 
                For official NASA imagery, please visit the linked resources above.
              </p>
              <p className="font-semibold text-foreground">
                Official data sources: NASA, NOAA Space Weather Prediction Center
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
