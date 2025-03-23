
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClassType, Seat, Train } from '@/lib/types';
import { trains } from '@/lib/data';
import SeatSelection from '@/components/booking/SeatSelection';
import BookingSummary from '@/components/booking/BookingSummary';
import { toast } from 'sonner';

const Booking = () => {
  const { trainId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classTypeParam = searchParams.get('class') as ClassType || 'economy';
  const dateParam = searchParams.get('date') || new Date().toISOString();
  const passengersParam = parseInt(searchParams.get('passengers') || '1', 10);

  const [train, setTrain] = useState<Train | null>(null);
  const [classType, setClassType] = useState<ClassType>(classTypeParam);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState(passengersParam);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the train by ID
    const selectedTrain = trains.find((t) => t.id === trainId);
    setTrain(selectedTrain || null);
    setIsLoading(false);
  }, [trainId]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!train) return 0;
    
    const basePrice = train.price[classType] * passengers;
    const serviceFee = basePrice * 0.05;
    const taxes = basePrice * 0.08;
    
    return basePrice + serviceFee + taxes;
  };

  const bookingDetails = {
    train,
    date: dateParam ? new Date(dateParam) : null,
    passengers,
    classType,
    seats: selectedSeats,
    totalPrice: calculateTotalPrice(),
  };

  const handleSeatSelect = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  const handleContinue = () => {
    if (selectedSeats.length < passengers) {
      toast.error(`Please select ${passengers} seats to continue.`);
      return;
    }

    // Store booking details in sessionStorage for the checkout page
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="section-container">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!train) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="section-container">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Train Not Found</h1>
              <p className="text-muted-foreground mb-6">The train you're looking for doesn't exist or has been removed.</p>
              <Button variant="outline" onClick={() => navigate('/search')}>
                Back to Search
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8 animate-fade-up">
            <div>
              <Button 
                variant="ghost" 
                className="pl-0 gap-2 mb-4" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Select Your Seats</h1>
              <p className="text-muted-foreground">
                Choose from available seats for your journey from {train.from.city} to {train.to.city}.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <SeatSelection
                train={train}
                date={dateParam}
                classType={classType}
                onSeatSelect={handleSeatSelect}
                passengers={passengers}
              />
            </div>

            <div className="lg:w-96 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <BookingSummary bookingDetails={bookingDetails} />
            </div>
          </div>

          <div className="mt-8 flex justify-between animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            
            <Button className="gap-2" onClick={handleContinue}>
              <span>Continue to Checkout</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
