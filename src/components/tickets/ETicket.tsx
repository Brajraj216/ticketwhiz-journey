
import React from 'react';
import { format } from 'date-fns';
import { MapPin, Train, User, Calendar, Clock, TicketIcon, QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookingDetails, Passenger, Seat } from '@/lib/types';
import { getClassLabel } from '@/lib/data';

interface ETicketProps {
  bookingDetails: BookingDetails;
  confirmationId: string;
  passengers: Passenger[];
  paymentInfo: {
    id: string;
    method: string;
    last4?: string;
    timestamp: string;
  };
}

const ETicket: React.FC<ETicketProps> = ({
  bookingDetails,
  confirmationId,
  passengers,
  paymentInfo,
}) => {
  const { train, date, classType, seats } = bookingDetails;

  if (!train || !date) {
    return null;
  }

  // Helper function to format date
  const formatDate = (date: Date): string => {
    return format(date, 'dd MMM yyyy');
  };

  // Helper to get passenger by seat
  const getPassengerForSeat = (seatId: string): Passenger | undefined => {
    return passengers.find(p => p.seatId === seatId);
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg print:shadow-none">
      <CardContent className="p-0">
        <div className="bg-primary/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TicketIcon className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">E-Ticket</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Booking ID: <span className="font-medium">{confirmationId}</span>
          </div>
        </div>

        <div className="p-4">
          {/* Train Details */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Train</div>
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4 text-primary" />
                <span className="font-semibold">{train.name} ({train.number})</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Date of Journey</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-semibold">{formatDate(date)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Class</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{getClassLabel(classType)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Journey Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1 col-span-1">
              <div className="text-sm text-muted-foreground">From</div>
              <div className="font-semibold">{train.from.name}</div>
              <div className="text-sm">{train.from.city}</div>
              <div className="flex items-center gap-1 mt-1 text-primary">
                <Clock className="h-3 w-3" />
                <span className="text-sm font-medium">{train.departureTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-center col-span-1 relative">
              <Separator className="w-full absolute" />
              <div className="h-2 w-2 rounded-full bg-primary absolute left-0"></div>
              <div className="h-2 w-2 rounded-full bg-primary absolute right-0"></div>
              <div className="bg-background z-10 px-2">
                <div className="text-xs text-muted-foreground">{train.duration}</div>
              </div>
            </div>

            <div className="space-y-1 col-span-1">
              <div className="text-sm text-muted-foreground">To</div>
              <div className="font-semibold">{train.to.name}</div>
              <div className="text-sm">{train.to.city}</div>
              <div className="flex items-center gap-1 mt-1 text-primary">
                <Clock className="h-3 w-3" />
                <span className="text-sm font-medium">{train.arrivalTime}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Passenger Details */}
          <div>
            <h3 className="font-medium mb-3">Passenger Details</h3>
            <div className="grid grid-cols-12 bg-muted/50 p-2 rounded text-sm font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Age/Gender</div>
              <div className="col-span-2">Coach</div>
              <div className="col-span-3">Seat No.</div>
            </div>
            {seats.map((seat: Seat, index: number) => {
              const passenger = getPassengerForSeat(seat.id);
              if (!passenger) return null;
              
              return (
                <div key={seat.id} className="grid grid-cols-12 p-2 text-sm border-b">
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-4 font-medium">{passenger.name}</div>
                  <div className="col-span-2">
                    {passenger.age}/{passenger.gender.charAt(0).toUpperCase()}
                  </div>
                  <div className="col-span-2">{seat.coach}</div>
                  <div className="col-span-3">{seat.number}</div>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Payment Information</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Transaction ID:</div>
                <div className="font-medium">{paymentInfo.id}</div>
                <div>Payment Method:</div>
                <div className="font-medium">
                  {paymentInfo.method === 'credit-card' 
                    ? `Card ending with ${paymentInfo.last4}` 
                    : paymentInfo.method === 'upi' 
                      ? 'UPI' 
                      : 'Net Banking'}
                </div>
                <div>Amount Paid:</div>
                <div className="font-medium">₹{bookingDetails.totalPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-muted p-4 rounded-md">
                <QrCode className="h-24 w-24 mx-auto" />
                <div className="text-xs text-center mt-2">Scan to verify ticket</div>
              </div>
            </div>
          </div>

          <div className="mt-6 border border-dashed border-primary/20 rounded-md p-3 bg-primary/5">
            <h4 className="text-sm font-medium mb-2">Important Information:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Please carry a valid ID proof during the journey.</li>
              <li>• Arrive at the station at least 30 minutes before departure.</li>
              <li>• This e-ticket is valid only when presented with the mentioned ID proof.</li>
              <li>• In case of any queries, please contact our customer support.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ETicket;
