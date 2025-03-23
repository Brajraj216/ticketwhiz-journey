
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, CalendarIcon, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { findStations, stations } from '@/lib/data';

const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState('1');
  const [fromStations, setFromStations] = useState(stations);
  const [toStations, setToStations] = useState(stations);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [selectedFromStation, setSelectedFromStation] = useState('');
  const [selectedToStation, setSelectedToStation] = useState('');
  const [selectedFromName, setSelectedFromName] = useState('');
  const [selectedToName, setSelectedToName] = useState('');

  // Initialize form values from URL params
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const dateParam = searchParams.get('date');
    const passengersParam = searchParams.get('passengers');

    if (fromParam) {
      setSelectedFromStation(fromParam);
      setSelectedFromName(fromParam);
      setFromQuery(fromParam);
    }

    if (toParam) {
      setSelectedToStation(toParam);
      setSelectedToName(toParam);
      setToQuery(toParam);
    }

    if (dateParam) {
      setDate(new Date(dateParam));
    }

    if (passengersParam) {
      setPassengers(passengersParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (fromQuery) {
      setFromStations(findStations(fromQuery));
    } else {
      setFromStations(stations);
    }
  }, [fromQuery]);

  useEffect(() => {
    if (toQuery) {
      setToStations(findStations(toQuery));
    } else {
      setToStations(stations);
    }
  }, [toQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate({
      pathname: '/search',
      search: `?from=${selectedFromStation}&to=${selectedToStation}${date ? `&date=${date.toISOString()}` : ''}&passengers=${passengers}`,
    });
  };

  return (
    <Card className="w-full glass-card">
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
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2 lg:col-span-1">
                  <Label htmlFor="from">From</Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openFrom}
                        className="w-full justify-between"
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {selectedFromName || "Select station"}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 pointer-events-auto">
                      <Command>
                        <CommandInput 
                          placeholder="Search stations..." 
                          value={fromQuery}
                          onValueChange={setFromQuery}
                        />
                        <CommandList>
                          <CommandEmpty>No stations found.</CommandEmpty>
                          <CommandGroup>
                            {fromStations.map((station) => (
                              <CommandItem
                                key={station.id}
                                value={station.id}
                                onSelect={(value) => {
                                  setSelectedFromStation(value);
                                  setSelectedFromName(`${station.name}, ${station.city}`);
                                  setOpenFrom(false);
                                }}
                              >
                                <span>{station.name}, {station.city}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <Label htmlFor="to">To</Label>
                  <Popover open={openTo} onOpenChange={setOpenTo}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openTo}
                        className="w-full justify-between"
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {selectedToName || "Select station"}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 pointer-events-auto">
                      <Command>
                        <CommandInput 
                          placeholder="Search stations..." 
                          value={toQuery}
                          onValueChange={setToQuery}
                        />
                        <CommandList>
                          <CommandEmpty>No stations found.</CommandEmpty>
                          <CommandGroup>
                            {toStations.map((station) => (
                              <CommandItem
                                key={station.id}
                                value={station.id}
                                onSelect={(value) => {
                                  setSelectedToStation(value);
                                  setSelectedToName(`${station.name}, ${station.city}`);
                                  setOpenTo(false);
                                }}
                              >
                                <span>{station.name}, {station.city}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 lg:col-span-1">
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

                <div className="space-y-2 lg:col-span-1">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger id="passengers" className="w-full">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end lg:col-span-1">
                  <Button type="submit" className="w-full">Find Trains</Button>
                </div>
              </div>
            </form>
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
  );
};

export default SearchForm;
