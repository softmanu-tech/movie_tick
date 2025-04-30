
import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie, ShowTime, Seat } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, Download, Home, Ticket, Share2 } from "lucide-react";

interface BookingConfirmationState {
  movie: Movie;
  showtime: ShowTime;
  selectedSeats: Seat[];
  name: string;
  email: string;
  totalPrice: number;
}

const BookingConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as BookingConfirmationState;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { movie, showtime, selectedSeats, name, email, totalPrice } = state;
  const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
  const bookingDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary/10 rounded-lg p-6 mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your tickets have been sent to {email}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Booking ID: {bookingId}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.rating} | {movie.duration} min</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="text-sm">{showtime.date} | {showtime.time}</p>
                  </div>
                  <p className="text-sm mt-1">{showtime.theater}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Ticket Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Seats</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats
                        .sort((a, b) => a.row.localeCompare(b.row) || a.number - b.number)
                        .map(seat => (
                          <div key={seat.id} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">
                            {seat.row}{seat.number}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Date</p>
                    <p className="font-medium">{bookingDate}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tickets ({selectedSeats.length} x ${showtime.price.toFixed(2)})</span>
                    <span>${(selectedSeats.length * showtime.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Fee</span>
                    <span>$1.50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Paid</span>
                    <span>${(totalPrice + 1.50).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* QR Code or Barcode for Ticket */}
              <div className="pt-4 pb-2">
                <div className="mx-auto max-w-xs p-4 bg-white rounded-lg shadow-sm">
                  <div className="mb-3 text-center">
                    <p className="font-bold">Scan at the theater</p>
                  </div>
                  {/* This would be a real QR code in a production app */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center rounded">
                    <Ticket className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm mt-3 font-mono">{bookingId}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </Button>
              <Button className="w-full sm:w-auto" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Ticket
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full" variant="default">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-3">Important Information</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Please arrive at least 15 minutes before the movie starts.</li>
              <li>Have your booking ID or QR code ready for verification.</li>
              <li>Outside food and beverages are not allowed in the theater.</li>
              <li>For any assistance, please contact our customer support.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
