
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketCheck, Download, Calendar, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MyBookingsPage = () => {
  const [email, setEmail] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeBookings, setActiveBookings] = useState([
    {
      id: "BK123456",
      movieTitle: "Inception: 10th Anniversary",
      theaterName: "Cineworld IMAX",
      date: "2025-05-15",
      time: "19:30",
      seats: ["F7", "F8", "F9"],
      totalPrice: 42.50,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
    },
    {
      id: "BK654321",
      movieTitle: "The Dark Knight",
      theaterName: "Starlight Cinemas",
      date: "2025-05-20",
      time: "20:15",
      seats: ["D12", "D13"],
      totalPrice: 28.00,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c"
    }
  ]);

  const handleFind = () => {
    // In a real app, this would query the backend for the booking
    if (email && bookingCode) {
      setIsLoggedIn(true);
    }
  };

  const handleCancel = (id: string) => {
    // In a real app, this would call an API to cancel the booking
    setActiveBookings(activeBookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">My Bookings</h1>
      
      {!isLoggedIn ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Find Your Bookings</CardTitle>
            <CardDescription>Enter your email and booking code to view your reservations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bookingCode" className="text-sm font-medium">Booking Code</label>
              <Input 
                id="bookingCode" 
                placeholder="e.g. BK123456" 
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleFind}>
              Find My Bookings
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="active">Active Bookings</TabsTrigger>
              <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              {activeBookings.length > 0 ? (
                activeBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img 
                          src={booking.image} 
                          alt={booking.movieTitle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-3/4 flex flex-col">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{booking.movieTitle}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <TicketCheck className="h-4 w-4" /> Booking ID: {booking.id}
                              </CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" /> Ticket
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 flex-grow">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.theaterName}</span>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Seats:</span>{" "}
                              <span className="font-medium">{booking.seats.join(", ")}</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <span className="text-sm text-muted-foreground">Total Paid:</span>{" "}
                            <span className="font-bold">${booking.totalPrice.toFixed(2)}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Alert>
                  <AlertDescription>
                    You have no active bookings at the moment.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              <Alert>
                <AlertDescription>
                  Your past booking history will appear here.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
