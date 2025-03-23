
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
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate passenger information
    const allPassengersValid = passengers.every((p) => p.name.trim() !== '' && p.age > 0);
    if (!allPassengersValid) {
      toast.error('Please fill in all passenger details');
      setIsSubmitting(false);
      return;
    }

    // Validate contact information
    if (!contactEmail || !contactPhone) {
      toast.error('Please provide contact information');
      setIsSubmitting(false);
      return;
    }

    // Validate payment information if using credit card
    if (paymentMethod === 'credit-card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        toast.error('Please complete payment information');
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      // Store booking confirmation
      const confirmationId = Math.random().toString(36).substring(2, 10).toUpperCase();
      const confirmationDetails = {
        ...bookingDetails,
        passengers,
        contactEmail,
        contactPhone,
        confirmationId,
        bookingDate: new Date().toISOString(),
      };
      
      sessionStorage.setItem('confirmationDetails', JSON.stringify(confirmationDetails));
      
      // Navigate to confirmation page
      navigate('/confirmation');
      setIsSubmitting(false);
    }, 2000);
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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">
              Enter passenger details and payment information to finalize your booking.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <form onSubmit={handleSubmit}>
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

                {/* Payment Information */}
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Payment Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4 mb-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center gap-2">
                          <span>Credit or Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Expiry Date</Label>
                            <Input
                              id="card-expiry"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvv">CVV</Label>
                            <Input
                              id="card-cvv"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="bg-muted/30 p-4 rounded-lg text-center">
                        <p className="text-muted-foreground">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? 'Processing...' : 'Complete Booking'}
                    {!isSubmitting && <Lock size={16} />}
                  </Button>
                </div>
              </form>
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
