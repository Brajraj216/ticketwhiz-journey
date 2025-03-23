
import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import TrainCard from '@/components/common/TrainCard';
import { ClassType, Train } from '@/lib/types';
import { searchTrains } from '@/lib/data';

interface SearchResultsProps {
  fromId: string;
  toId: string;
  date: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ fromId, toId, date }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassType>('economy');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [timeFilters, setTimeFilters] = useState({
    morning: true,
    afternoon: true,
    evening: true,
    night: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const results = searchTrains(fromId, toId, new Date(date));
      setTrains(results);
      setFilteredTrains(results);
      setIsLoading(false);
    }, 1000);
  }, [fromId, toId, date]);

  useEffect(() => {
    applyFilters();
  }, [selectedClass, priceRange, timeFilters, trains]);

  const applyFilters = () => {
    let filtered = [...trains];

    // Filter by price
    filtered = filtered.filter(
      (train) => train.price[selectedClass] >= priceRange[0] && train.price[selectedClass] <= priceRange[1]
    );

    // Filter by time
    filtered = filtered.filter((train) => {
      const hour = parseInt(train.departureTime.split(':')[0]);
      if (hour >= 5 && hour < 12 && !timeFilters.morning) return false;
      if (hour >= 12 && hour < 17 && !timeFilters.afternoon) return false;
      if (hour >= 17 && hour < 21 && !timeFilters.evening) return false;
      if ((hour >= 21 || hour < 5) && !timeFilters.night) return false;
      return true;
    });

    setFilteredTrains(filtered);
  };

  const handleTimeFilterChange = (key: keyof typeof timeFilters) => {
    setTimeFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2" 
          onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
        >
          <Filter size={16} />
          <span>Filters</span>
          {(timeFilters.morning && timeFilters.afternoon && timeFilters.evening && timeFilters.night) ? null : (
            <Badge variant="secondary" className="ml-2">Active</Badge>
          )}
        </Button>
      </div>

      {/* Filters */}
      <div className={`${isFilterMobileOpen ? 'block' : 'hidden'} md:block md:w-64 space-y-6 flex-shrink-0`}>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range (₹)</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Departure Time */}
              <div>
                <h4 className="text-sm font-medium mb-3">Departure Time</h4>
                <div className="space-y-2">
                  {[
                    { id: 'morning', label: 'Morning (5:00 - 11:59)' },
                    { id: 'afternoon', label: 'Afternoon (12:00 - 16:59)' },
                    { id: 'evening', label: 'Evening (17:00 - 20:59)' },
                    { id: 'night', label: 'Night (21:00 - 4:59)' },
                  ].map((time) => (
                    <div key={time.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={time.id} 
                        checked={timeFilters[time.id as keyof typeof timeFilters]} 
                        onCheckedChange={() => handleTimeFilterChange(time.id as keyof typeof timeFilters)}
                      />
                      <Label htmlFor={time.id} className="text-sm cursor-pointer">
                        {time.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 md:hidden" 
                onClick={() => setIsFilterMobileOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Train List */}
      <div className="flex-1 space-y-4">
        {isLoading ? (
          // Loading state
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-border overflow-hidden animate-pulse">
                <div className="h-32 bg-muted"></div>
              </Card>
            ))}
          </>
        ) : filteredTrains.length === 0 ? (
          // No results
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No trains found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search for a different route.
              </p>
            </CardContent>
          </Card>
        ) : (
          // Results
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredTrains.length} {filteredTrains.length === 1 ? 'train' : 'trains'} found
              </p>
              {/* Add sorting options if needed */}
            </div>
            
            {filteredTrains.map((train, index) => (
              <TrainCard
                key={train.id}
                train={train}
                date={date}
                selectedClass={selectedClass}
                onSelectClass={setSelectedClass}
                animationDelay={0.1 * index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
