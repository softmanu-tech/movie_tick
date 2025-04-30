
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const theaters = [
  {
    id: "1",
    name: "Cineworld IMAX",
    location: "Downtown Cinema Complex, 123 Main St",
    phone: "+1 (555) 123-4567",
    features: ["IMAX", "4DX", "VIP Seating", "Dolby Atmos"],
    hours: "9:00 AM - 11:30 PM",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Starlight Cinemas",
    location: "Westfield Mall, 456 Park Avenue",
    phone: "+1 (555) 987-6543",
    features: ["Recliner Seats", "Dine-in Service", "ScreenX"],
    hours: "10:00 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Regent Picture House",
    location: "Historic District, 789 Heritage Blvd",
    phone: "+1 (555) 456-7890",
    features: ["Boutique Theater", "Classic Films", "Full Bar"],
    hours: "12:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1596445836561-991bcd39a86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "Metroplex Theaters",
    location: "North Shopping Center, 321 Commerce Dr",
    phone: "+1 (555) 789-0123",
    features: ["RPX Screens", "Game Zone", "Family Packages"],
    hours: "10:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const TheatersPage = () => {
  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Our Theaters</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaters.map((theater) => (
          <Card key={theater.id} className="overflow-hidden">
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={theater.image} 
                alt={theater.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{theater.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {theater.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{theater.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{theater.hours}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {theater.features.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to={`/`}>
                  View Showtimes
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TheatersPage;
