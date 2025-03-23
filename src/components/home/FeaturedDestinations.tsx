
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { destinations } from '@/lib/data';
import { Link } from 'react-router-dom';

const FeaturedDestinations = () => {
  const popularDestinations = destinations.filter((dest) => dest.popular);

  return (
    <section className="bg-background py-20">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our most loved routes and iconic cities connected by our extensive rail network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-2xl font-semibold">{destination.name}</h3>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-muted-foreground mb-4">{destination.description}</p>
                <Link to={`/search?to=${destination.name}`}>
                  <Button variant="ghost" className="group/btn p-0 h-auto">
                    <span className="text-primary">Explore Trains</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/destinations">
            <Button variant="outline" className="rounded-full gap-2 px-6 group">
              <span>View All Destinations</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
