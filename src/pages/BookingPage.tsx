
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, showtimes, generateRandomSeats } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie, ShowTime, Seat } from "@/types";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Info, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtime, setShowtime] = useState<ShowTime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [step, setStep] = useState<'seats' | 'details' | 'payment'>('seats');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === movieId);
    const foundShowtime = showtimes.find((s) => s.id === showtimeId);
    
    if (foundMovie && foundShowtime) {
      setMovie(foundMovie);
      setShowtime(foundShowtime);
      
      // Generate random seats
      const seatsData = generateRandomSeats(showtimeId ?? "");
      setSeats(seatsData);
    } else {
      navigate("/");
    }
  }, [movieId, showtimeId, navigate]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalPrice = () => {
    if (!showtime) return 0;
    return selectedSeats.length * showtime.price;
  };

  const handleNextStep = () => {
    if (step === 'seats') {
      if (selectedSeats.length === 0) {
        toast({
          title: "Please select at least one seat",
          variant: "destructive",
        });
        return;
      }
      setStep('details');
    } else if (step === 'details') {
      if (!name || !email) {
        toast({
          title: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      setStep('payment');
    } else {
      // Final payment submission would happen here
      toast({
        title: "Booking Successful!",
        description: `Booking confirmed for ${selectedSeats.length} seats.`,
      });
      
      setTimeout(() => {
        navigate("/booking-confirmation", { 
          state: { 
            movie, 
            showtime, 
            selectedSeats,
            name,
            email,
            totalPrice: getTotalPrice(),
          } 
        });
      }, 1500);
    }
  };

  const renderSeats = () => {
    const rows = Array.from(new Set(seats.map(seat => seat.row))).sort();
    
    return (
      <div className="mt-6">
        {/* Screen */}
        <div className="mb-10 text-center">
          <div className="h-2 bg-primary/50 rounded-lg w-4/5 mx-auto mb-2 transform perspective-500 rotateX-40"></div>
          <p className="text-sm text-muted-foreground">SCREEN</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="seat seat-available w-6 h-6"></div>
              <span className="ml-2 text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="seat seat-selected w-6 h-6"></div>
              <span className="ml-2 text-sm">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="seat seat-booked w-6 h-6"></div>
              <span className="ml-2 text-sm">Booked</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {rows.map(row => (
              <div key={row} className="flex items-center mb-2">
                <div className="w-8 text-center font-semibold">{row}</div>
                <div className="flex">
                  {seats
                    .filter(seat => seat.row === row)
                    .sort((a, b) => a.number - b.number)
                    .map(seat => {
                      const isSelected = selectedSeats.some(s => s.id === seat.id);
                      
                      return (
                        <div
                          key={seat.id}
                          className={cn(
                            "seat",
                            seat.status === 'booked' 
                              ? "seat-booked"
                              : isSelected 
                                ? "seat-selected" 
                                : "seat-available"
                          )}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {seat.number}
                        </div>
                      );
                    })}
                </div>
                <div className="w-8 text-center font-semibold">{row}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCustomerDetails = () => {
    return (
      <div className="space-y-4 mt-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>
      </div>
    );
  };

  const renderPayment = () => {
    return (
      <div className="space-y-6 mt-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-3">Payment Summary</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tickets ({selectedSeats.length} x ${showtime?.price.toFixed(2)})</span>
              <span>${(selectedSeats.length * (showtime?.price || 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Booking Fee</span>
              <span>$1.50</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(getTotalPrice() + 1.50).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          
          {/* Simplified payment form for demo */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!movie || !showtime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => step === 'seats' ? navigate(-1) : setStep('seats')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 'seats' ? 'Back to Movie' : 'Back to Seat Selection'}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>
                      {showtime.date} | {showtime.time} | {showtime.theater}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Step {step === 'seats' ? '1' : step === 'details' ? '2' : '3'} of 3</p>
                    <p className="text-sm text-muted-foreground">
                      {step === 'seats' 
                        ? 'Select Seats' 
                        : step === 'details' 
                          ? 'Your Details' 
                          : 'Payment'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {step === 'seats' && renderSeats()}
                {step === 'details' && renderCustomerDetails()}
                {step === 'payment' && renderPayment()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  <span>
                    {step === 'seats' 
                      ? 'Select your preferred seats' 
                      : step === 'details' 
                        ? 'We\'ll send your tickets to this email' 
                        : 'Your payment information is secure'}
                  </span>
                </div>
                <Button onClick={handleNextStep} disabled={step === 'seats' && selectedSeats.length === 0}>
                  {step === 'payment' ? 'Confirm Payment' : 'Continue'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.rating} | {movie.duration} min</p>
                    <p className="text-sm mt-1">{showtime.date} | {showtime.time}</p>
                    <p className="text-sm">{showtime.theater}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats
                        .sort((a, b) => a.row.localeCompare(b.row) || a.number - b.number)
                        .map(seat => (
                          <div key={seat.id} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                            {seat.row}{seat.number}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No seats selected</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span>${(selectedSeats.length * showtime.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Booking Fee</span>
                    <span>$1.50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(getTotalPrice() + 1.50).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open(`tel:+1-800-TICKETS`)}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  Need Help? Call Support
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
