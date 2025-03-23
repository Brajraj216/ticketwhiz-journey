
export interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  from: Station;
  to: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: {
    economy: number;
    business: number;
    firstClass: number;
  };
  availability: {
    economy: number;
    business: number;
    firstClass: number;
  };
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  popular: boolean;
}

export type ClassType = 'economy' | 'business' | 'firstClass';

export interface Seat {
  id: string;
  number: string;
  coach: string;
  classType: ClassType;
  status: 'available' | 'booked' | 'selected';
  price: number;
}

export interface BookingDetails {
  train: Train | null;
  date: Date | null;
  passengers: number;
  classType: ClassType;
  seats: Seat[];
  totalPrice: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatId: string;
}
