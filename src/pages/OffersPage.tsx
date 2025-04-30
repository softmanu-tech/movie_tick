
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Tag, Percent, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const offers = [
  {
    id: "1",
    title: "Midweek Special",
    description: "40% off all movie tickets every Tuesday and Wednesday",
    validUntil: "2025-12-31",
    code: "MIDWEEK40",
    discount: "40% off",
    conditions: ["Valid only on Tuesdays and Wednesdays", "Not valid on holidays", "Cannot be combined with other offers"]
  },
  {
    id: "2",
    title: "Student Discount",
    description: "25% off with valid student ID, any day of the week",
    validUntil: "2025-12-31", 
    code: "STUDENT25",
    discount: "25% off",
    conditions: ["Must present valid student ID", "One ticket per ID", "Valid for standard screenings only"]
  },
  {
    id: "3",
    title: "Family Package",
    description: "Buy 4 tickets and get 20% off plus a free popcorn",
    validUntil: "2025-08-31",
    code: "FAMILY20",
    discount: "20% off + free popcorn",
    conditions: ["Must purchase 4 or more tickets", "Valid on weekends and holidays", "One free regular popcorn per group"]
  },
  {
    id: "4",
    title: "Early Bird Special",
    description: "30% off all screenings before 12pm",
    validUntil: "2025-12-31",
    code: "EARLYBIRD30",
    discount: "30% off",
    conditions: ["Valid for screenings starting before 12pm", "Available all week", "Subject to availability"]
  }
];

const OffersPage = () => {
  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Special Offers</h1>
      
      <Alert className="mb-8 bg-primary/10 border-primary">
        <AlertDescription className="text-foreground">
          Use these promo codes during checkout to redeem your discount. All offers are subject to availability.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="border-2 border-muted hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{offer.title}</CardTitle>
                  <CardDescription className="mt-1">{offer.description}</CardDescription>
                </div>
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                  {offer.discount}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="font-medium">Promo Code:</span>
                </div>
                <div className="bg-muted px-3 py-2 rounded-md font-mono text-center select-all">
                  {offer.code}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Conditions:</p>
                <ul className="text-sm space-y-1">
                  {offer.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary mt-1">{index + 1}</div>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href="/">Book With This Offer</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
