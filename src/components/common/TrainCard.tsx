
import React from 'react';
import { ArrowRight, Clock, Train as TrainIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Train, ClassType } from '@/lib/types';
import { Link } from 'react-router-dom';
import { getClassLabel } from '@/lib/data';

interface TrainCardProps {
  train: Train;
  date: string;
  selectedClass: ClassType;
  onSelectClass: (classType: ClassType) => void;
  animationDelay?: number;
}

const TrainCard: React.FC<TrainCardProps> = ({
  train,
  date,
  selectedClass,
  onSelectClass,
  animationDelay = 0,
}) => {
  const formatTime = (time: string) => {
    return time;
  };

  return (
    <Card 
      className="border border-border overflow-hidden transition-all hover:shadow-md animate-fade-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-0">
        <div className="bg-secondary/30 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <TrainIcon className="h-5 w-5 text-primary mr-2" />
            <div>
              <h3 className="font-semibold">{train.name}</h3>
              <p className="text-xs text-muted-foreground">{train.number}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {train.duration}
          </Badge>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="text-2xl font-semibold">{formatTime(train.departureTime)}</p>
                <p className="text-sm">{train.from.name}</p>
              </div>

              <div className="hidden md:block relative w-24">
                <Separator className="absolute top-1/2 w-full" />
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-primary transform -translate-y-1/2 rounded-full" />
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-primary transform -translate-y-1/2 rounded-full" />
              </div>

              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">Arrival</p>
                <p className="text-2xl font-semibold">{formatTime(train.arrivalTime)}</p>
                <p className="text-sm">{train.to.name}</p>
              </div>
            </div>

            <div className="border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Select Class</p>
                <div className="flex space-x-2">
                  {(Object.keys(train.availability) as ClassType[]).map((classType) => (
                    <Button
                      key={classType}
                      variant={selectedClass === classType ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onSelectClass(classType)}
                      className="flex-1"
                      disabled={train.availability[classType] <= 0}
                    >
                      {getClassLabel(classType)}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-xl font-semibold">${train.price[selectedClass]}</p>
                  </div>
                  <Link to={`/booking/${train.id}?date=${date}&class=${selectedClass}`}>
                    <Button size="sm" className="gap-1">
                      <span>Select</span>
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
