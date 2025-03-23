
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Home, Ticket, Printer } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ETicket from '@/components/tickets/ETicket';
import { BookingDetails } from '@/lib/types';
import { toast } from 'sonner';

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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("E-Ticket downloaded successfully!");
  };

  const handleViewBooking = () => {
    toast.info("Booking history feature coming soon!");
  };

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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-up print:hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Your booking has been confirmed and your e-ticket is ready.
              </p>
            </div>

            {/* E-Ticket */}
            <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <ETicket 
                bookingDetails={confirmationDetails as BookingDetails}
                confirmationId={confirmationDetails.confirmationId}
                passengers={confirmationDetails.passengers}
                paymentInfo={confirmationDetails.paymentInfo}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-up print:hidden" style={{ animationDelay: '0.3s' }}>
              <Button className="gap-2" onClick={() => navigate('/')}>
                <Home size={16} />
                <span>Return to Home</span>
              </Button>
              
              <Button variant="outline" className="gap-2" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print E-Ticket</span>
              </Button>
              
              <Button variant="outline" className="gap-2" onClick={handleDownload}>
                <Download size={16} />
                <span>Download E-Ticket</span>
              </Button>
              
              <Button variant="outline" className="gap-2" onClick={handleViewBooking}>
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
