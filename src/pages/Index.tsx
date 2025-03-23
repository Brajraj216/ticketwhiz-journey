
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import { ArrowRight, Award, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Featured Destinations */}
        <FeaturedDestinations />

        {/* Why Choose Us */}
        <section className="bg-secondary py-20">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why Choose TrainWhiz
              </h2>
              <p className="text-lg text-muted-foreground">
                We make train travel seamless, comfortable, and enjoyable for every passenger.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Secure Booking",
                  description: "Your payment information is encrypted and protected with industry-standard security protocols.",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Best Price Guarantee",
                  description: "We offer the best prices with no hidden fees or charges. Find it cheaper? We'll match it.",
                },
                {
                  icon: <Star className="h-10 w-10 text-primary" />,
                  title: "Exceptional Service",
                  description: "Our dedicated support team is available 24/7 to assist you with any questions or concerns.",
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all animate-fade-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't just take our word for it. Here's what travelers love about TrainWhiz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The booking process was incredibly smooth. I found the perfect train in seconds and the seat selection was intuitive.",
                  name: "Sarah Johnson",
                  title: "Frequent Traveler",
                },
                {
                  quote: "I love the price alerts feature! Saved me over $50 on my cross-country trip by notifying me of a fare drop.",
                  name: "Michael Chang",
                  title: "Business Traveler",
                },
                {
                  quote: "Customer service went above and beyond when I needed to change my booking at the last minute. Truly impressive!",
                  name: "Elena Rodriguez",
                  title: "Family Vacationer",
                },
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-background border border-border rounded-xl shadow-sm animate-fade-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex-1">
                    <p className="italic text-foreground/80 mb-4">"{testimonial.quote}"</p>
                    <Separator className="my-4" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="section-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-primary-foreground/80 text-lg">
                  Book your train tickets today and experience the comfort and convenience of train travel with TrainWhiz.
                </p>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-8 gap-2 whitespace-nowrap animate-pulse-subtle"
              >
                <span>Book Now</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
