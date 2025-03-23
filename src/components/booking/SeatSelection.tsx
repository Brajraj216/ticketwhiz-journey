
import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ClassType, Seat, Train } from '@/lib/types';
import { generateSeats, getClassLabel } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SeatSelectionProps {
  train: Train;
  date: string;
  classType: ClassType;
  onSeatSelect: (seats: Seat[]) => void;
  passengers: number;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  train,
  date,
  classType,
  onSeatSelect,
  passengers,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [coaches, setCoaches] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [coachSeats, setCoachSeats] = useState<Seat[]>([]);

  // Initialize seats
  useEffect(() => {
    const generatedSeats = generateSeats(classType, train);
    setSeats(generatedSeats);

    // Get unique coach names
    const uniqueCoaches = Array.from(new Set(generatedSeats.map((seat) => seat.coach)));
    setCoaches(uniqueCoaches);
    
    // Set initial coach selection
    if (uniqueCoaches.length > 0) {
      setSelectedCoach(uniqueCoaches[0]);
    }

    // Reset selected seats when class type changes
    setSelectedSeats([]);
  }, [train, classType]);

  // Filter seats by selected coach
  useEffect(() => {
    if (selectedCoach) {
      setCoachSeats(seats.filter((seat) => seat.coach === selectedCoach));
    }
  }, [selectedCoach, seats]);

  const handleSeatToggle = (seat: Seat) => {
    if (selectedSeats.find((s) => s.id === seat.id)) {
      // If seat is already selected, remove it
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.length < passengers) {
      // If seat is not selected and we haven't reached the max, add it
      setSelectedSeats((prev) => [...prev, { ...seat, status: 'selected' }]);
    }
  };

  // Update parent component when selected seats change
  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  // Calculate seat dimensions based on class type
  const seatSize = classType === 'firstClass' ? 'h-14 w-14' : classType === 'business' ? 'h-12 w-12' : 'h-10 w-10';
  const gridCols = classType === 'firstClass' ? 'grid-cols-3' : classType === 'business' ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Coach Selection */}
        <Card className="md:w-64 flex-shrink-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Coach</CardTitle>
            <CardDescription>
              {getClassLabel(classType)} class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedCoach} 
              onValueChange={setSelectedCoach}
              className="flex flex-col space-y-2"
            >
              {coaches.map((coach) => (
                <div key={coach} className="flex items-center space-x-2">
                  <RadioGroupItem value={coach} id={coach} />
                  <Label htmlFor={coach} className="cursor-pointer flex-1">
                    Coach {coach}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {seats.filter(seat => seat.coach === coach && seat.status === 'available').length} seats
                  </Badge>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Seat Map */}
        <div className="flex-1">
          <Card className="flex-1 h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Select Seats</CardTitle>
                  <CardDescription>
                    Coach {selectedCoach} - {selectedSeats.length} of {passengers} selected
                  </CardDescription>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-sm border border-border bg-white"></div>
                    <span className="text-xs text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-sm bg-primary"></div>
                    <span className="text-xs text-muted-foreground">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-sm bg-muted"></div>
                    <span className="text-xs text-muted-foreground">Booked</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-muted/50 rounded-lg py-2 px-6 text-center text-sm font-medium">
                  Front of Train
                </div>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                {coachSeats.length > 0 ? (
                  <div className="p-4 bg-accent/30 rounded-lg border border-border/50">
                    <div className={`grid ${gridCols} gap-4`}>
                      {coachSeats.map((seat) => (
                        <button
                          key={seat.id}
                          className={`${seatSize} rounded-lg flex items-center justify-center border transition-all ${
                            selectedSeats.find((s) => s.id === seat.id)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : seat.status === 'booked'
                              ? 'bg-muted border-border cursor-not-allowed'
                              : 'bg-white border-border hover:border-primary/50'
                          }`}
                          onClick={() => seat.status !== 'booked' && handleSeatToggle(seat)}
                          disabled={seat.status === 'booked' || (selectedSeats.length >= passengers && !selectedSeats.find((s) => s.id === seat.id))}
                        >
                          {selectedSeats.find((s) => s.id === seat.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            seat.number
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No seats available in this coach.
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
