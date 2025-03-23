
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Home, Ticket } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BookingSummary from '@/components/booking/BookingSummary';
import { BookingDetails } from '@/lib/types';

const Confirmation = () => {
  const navigate = useNavigate();
  const [confirmationDetails, setConfirmationDetails] = useState<any>(null);

  // Load confirmation details from sessionStorage
  useEffect(() => {
    const storedDetails = sessionStorage.getItem('confirmationDetails');
    if (storedDetails) {
      setConfirmationDetails(JSON.parse(storedDetails));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!confirmationDetails) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Your booking has been confirmed and your tickets are ready.
              </p>
            </div>

            <Card className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <CardTitle>Confirmation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="font-semibold">{confirmationDetails.confirmationId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Date</p>
                    <p className="font-semibold">
                      {new Date(confirmationDetails.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Email</p>
                    <p className="font-semibold">{confirmationDetails.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Phone</p>
                    <p className="font-semibold">{confirmationDetails.contactPhone}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-3">Passenger Information</h3>
                  <div className="space-y-4">
                    {confirmationDetails.passengers.map((passenger: any, index: number) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Name</p>
                            <p className="font-medium">{passenger.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Age / Gender</p>
                            <p className="font-medium">
                              {passenger.age} / {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Seat</p>
                            <p className="font-medium">
                              Coach {confirmationDetails.seats[index]?.coach}, 
                              Seat {confirmationDetails.seats[index]?.number}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <BookingSummary 
                  bookingDetails={confirmationDetails as BookingDetails} 
                  isCheckout={true} 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button className="gap-2" onClick={() => navigate('/')}>
                <Home size={16} />
                <span>Return to Home</span>
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                <span>Download E-Tickets</span>
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Ticket size={16} />
                <span>View Booking</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
