
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import { findStations } from '@/lib/data';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const dateParam = searchParams.get('date');

    // Initialize from station
    if (fromParam) {
      setFromStation(fromParam);
    }

    // Initialize to station
    if (toParam) {
      setToStation(toParam);
    }

    // Initialize date
    if (dateParam) {
      setDate(dateParam);
    } else {
      setDate(new Date().toISOString());
    }

    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="section-container">
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Find Trains</h1>
            <p className="text-muted-foreground">
              Search for trains between stations and book your journey with ease.
            </p>
          </div>

          <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <SearchForm />
          </div>

          {!isLoading && fromStation && toStation && (
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <SearchResults fromId={fromStation} toId={toStation} date={date} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
