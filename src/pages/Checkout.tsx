
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, User } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { BookingDetails, Passenger } from '@/lib/types';
import BookingSummary from '@/components/booking/BookingSummary';
import PaymentGateway from '@/components/checkout/PaymentGateway';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Passenger info, 2: Payment

  // Load booking details from sessionStorage
  useEffect(() => {
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails) as BookingDetails;
      setBookingDetails(parsedDetails);

      // Initialize passengers array based on booking details
      if (parsedDetails.seats && parsedDetails.seats.length > 0) {
        const initialPassengers = parsedDetails.seats.map((seat) => ({
          name: '',
          age: 0,
          gender: 'male' as 'male' | 'female' | 'other',
          seatId: seat.id,
        }));
        setPassengers(initialPassengers);
      }
    } else {
      navigate('/search');
    }
  }, [navigate]);

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passenger information
    const allPassengersValid = passengers.every((p) => p.name.trim() !== '' && p.age > 0);
    if (!allPassengersValid) {
      toast.error('Please fill in all passenger details');
      return;
    }

    // Validate contact information
    if (!contactEmail || !contactPhone) {
      toast.error('Please provide contact information');
      return;
    }

    // Move to payment step
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentComplete = (paymentInfo: {
    id: string;
    method: string;
    last4?: string;
    timestamp: string;
  }) => {
    setIsSubmitting(true);
    
    // Store booking confirmation
    const confirmationId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const confirmationDetails = {
      ...bookingDetails,
      passengers,
      contactEmail,
      contactPhone,
      confirmationId,
      bookingDate: new Date().toISOString(),
      paymentInfo,
    };
    
    sessionStorage.setItem('confirmationDetails', JSON.stringify(confirmationDetails));
    
    // Navigate to confirmation page
    navigate('/confirmation');
    setIsSubmitting(false);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="section-container">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">No Booking Found</h1>
              <p className="text-muted-foreground mb-6">Please go back and select a train first.</p>
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
          <div className="mb-8 animate-fade-up">
            <Button 
              variant="ghost" 
              className="pl-0 gap-2 mb-4" 
              onClick={() => step === 1 ? navigate(-1) : setStep(1)}
            >
              <ArrowLeft size={16} />
              <span>{step === 1 ? 'Back' : 'Back to passenger details'}</span>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {step === 1 ? 'Complete Your Booking' : 'Payment'}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 
                ? 'Enter passenger details to continue with your booking.' 
                : 'Complete payment to confirm your booking.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {step === 1 ? (
                <form onSubmit={handlePassengerSubmit}>
                  {/* Passenger Information */}
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <span>Passenger Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {passengers.map((passenger, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">Passenger {index + 1}</h3>
                            <div className="text-sm text-muted-foreground">
                              Seat: {bookingDetails.seats[index]?.coach}-{bookingDetails.seats[index]?.number}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`name-${index}`}>Full Name</Label>
                              <Input
                                id={`name-${index}`}
                                value={passenger.name}
                                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                required
                                placeholder="Enter full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`age-${index}`}>Age</Label>
                              <Input
                                id={`age-${index}`}
                                type="number"
                                min="1"
                                value={passenger.age || ''}
                                onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)}
                                required
                                placeholder="Enter age"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Gender</Label>
                              <RadioGroup
                                value={passenger.gender}
                                onValueChange={(value) => handlePassengerChange(index, 'gender', value as 'male' | 'female' | 'other')}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id={`male-${index}`} />
                                  <Label htmlFor={`male-${index}`}>Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id={`female-${index}`} />
                                  <Label htmlFor={`female-${index}`}>Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id={`other-${index}`} />
                                  <Label htmlFor={`other-${index}`}>Other</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                          {index < passengers.length - 1 && <Separator className="mt-6" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            required
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                    <Button type="submit" className="gap-2">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              ) : (
                /* Payment Step */
                <PaymentGateway 
                  amount={bookingDetails.totalPrice}
                  onPaymentComplete={handlePaymentComplete}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>

            <div className="lg:w-96 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="sticky top-24">
                <BookingSummary 
                  bookingDetails={bookingDetails} 
                  isCheckout={true} 
                />
                
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Your payment information is secure and encrypted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
