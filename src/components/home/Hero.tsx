
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar as CalendarIcon, Train as TrainIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Hero = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date>();

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2072&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Travel Smarter, <span className="text-primary">Book Faster</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            Experience seamless train travel with our intuitive booking platform. From scenic routes to express journeys, find the perfect train for your next adventure.
          </p>
        </div>

        {/* Booking Card */}
        <Card className="mt-10 w-full max-w-4xl glass-card overflow-hidden shadow-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-0">
            <Tabs defaultValue="one-way" className="w-full">
              <div className="bg-secondary/50 px-6 py-4 border-b">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="one-way" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="from"
                        placeholder="City or Station"
                        className="pl-10"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="to"
                        placeholder="City or Station"
                        className="pl-10"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-end">
                    <Link 
                      to={{
                        pathname: "/search",
                        search: from && to ? `?from=${from}&to=${to}${date ? `&date=${date.toISOString()}` : ''}` : '',
                      }}
                      className="w-full"
                    >
                      <Button className="w-full gap-2 group">
                        <span>Find Trains</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="round-trip" className="p-6 space-y-4">
                <p className="text-muted-foreground text-center">Round trip booking coming soon!</p>
              </TabsContent>

              <TabsContent value="multi-city" className="p-6 space-y-4">
                <p className="text-muted-foreground text-center">Multi-city booking coming soon!</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {[
            {
              icon: <TrainIcon className="h-8 w-8 text-primary" />,
              title: "Premium Experience",
              description: "Travel in comfort with premium amenities and top-notch service.",
            },
            {
              icon: <CalendarIcon className="h-8 w-8 text-primary" />,
              title: "Flexible Booking",
              description: "Change plans? Modify your booking with ease and minimal charges.",
            },
            {
              icon: <MapPin className="h-8 w-8 text-primary" />,
              title: "Extensive Network",
              description: "Access thousands of routes connecting major cities and hidden gems.",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
