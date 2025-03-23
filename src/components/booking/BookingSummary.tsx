
import React from 'react';
import { ArrowRight, CalendarIcon, CreditCard, MapPin, Train as TrainIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookingDetails, Seat } from '@/lib/types';
import { getClassLabel } from '@/lib/data';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
  isCheckout?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingDetails, isCheckout = false }) => {
  const { train, date, passengers, classType, seats, totalPrice } = bookingDetails;

  if (!train || !date) {
    return (
      <Card className="w-full animate-fade-up">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No booking details available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader className="pb-3">
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Train Details */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <TrainIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">{train.name}</h3>
                <p className="text-sm text-muted-foreground">{train.number}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {train.duration}
            </Badge>
          </div>

          <div className="pl-8 grid grid-cols-1 gap-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium">
                  {train.from.name}, {train.from.city}
                </p>
                <p className="text-sm text-primary">{train.departureTime}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium">
                  {train.to.name}, {train.to.city}
                </p>
                <p className="text-sm text-primary">{train.arrivalTime}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Class and Passengers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-primary" />
              <p className="font-medium">Passengers & Class</p>
            </div>
          </div>

          <div className="pl-6 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="text-sm font-medium">{getClassLabel(classType)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Passengers</p>
              <p className="text-sm font-medium">{passengers}</p>
            </div>
          </div>
        </div>

        {/* Seats */}
        {seats.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-medium">Selected Seats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {seats.map((seat) => (
                  <Badge key={seat.id} variant="outline" className="justify-between text-sm py-1.5">
                    <span>Coach {seat.coach}</span>
                    <span className="font-semibold">Seat {seat.number}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Ticket Price ({getClassLabel(classType)})</p>
            <p className="text-sm">${train.price[classType]} × {passengers}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Service Fee</p>
            <p className="text-sm">${(train.price[classType] * 0.05).toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Taxes</p>
            <p className="text-sm">${(train.price[classType] * 0.08).toFixed(2)}</p>
          </div>
          <Separator />
          <div className="flex justify-between items-center font-semibold">
            <p>Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>

      {!isCheckout && (
        <CardFooter className="pt-0">
          <Link to="/checkout" className="w-full">
            <Button className="w-full gap-2">
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingSummary;
