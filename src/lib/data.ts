
import { ClassType, Destination, Station, Train } from './types';

export const stations: Station[] = [
  { id: '1', name: 'Central Station', code: 'CST', city: 'New York' },
  { id: '2', name: 'Union Station', code: 'UST', city: 'Chicago' },
  { id: '3', name: 'Pacific Terminal', code: 'PCT', city: 'Los Angeles' },
  { id: '4', name: 'South Station', code: 'SST', city: 'Boston' },
  { id: '5', name: 'Penn Station', code: 'PST', city: 'Philadelphia' },
  { id: '6', name: 'King Street Station', code: 'KSS', city: 'Seattle' },
  { id: '7', name: 'Union Terminal', code: 'UNT', city: 'Denver' },
  { id: '8', name: 'Grand Central', code: 'GCT', city: 'New York' },
  { id: '9', name: 'Union Station', code: 'UNS', city: 'Washington DC' },
  { id: '10', name: 'Moynihan Train Hall', code: 'MTH', city: 'New York' },
];

export const trains: Train[] = [
  {
    id: '1',
    name: 'Empire Builder',
    number: 'EB-101',
    from: stations[0],
    to: stations[1],
    departureTime: '08:30',
    arrivalTime: '12:45',
    duration: '4h 15m',
    price: {
      economy: 89,
      business: 145,
      firstClass: 210,
    },
    availability: {
      economy: 40,
      business: 20,
      firstClass: 8,
    },
  },
  {
    id: '2',
    name: 'California Zephyr',
    number: 'CZ-202',
    from: stations[1],
    to: stations[2],
    departureTime: '10:15',
    arrivalTime: '18:30',
    duration: '8h 15m',
    price: {
      economy: 125,
      business: 210,
      firstClass: 320,
    },
    availability: {
      economy: 28,
      business: 12,
      firstClass: 5,
    },
  },
  {
    id: '3',
    name: 'Coast Starlight',
    number: 'CS-303',
    from: stations[2],
    to: stations[5],
    departureTime: '09:00',
    arrivalTime: '21:15',
    duration: '12h 15m',
    price: {
      economy: 150,
      business: 275,
      firstClass: 390,
    },
    availability: {
      economy: 35,
      business: 18,
      firstClass: 6,
    },
  },
  {
    id: '4',
    name: 'Northeast Regional',
    number: 'NR-404',
    from: stations[3],
    to: stations[8],
    departureTime: '07:45',
    arrivalTime: '11:10',
    duration: '3h 25m',
    price: {
      economy: 75,
      business: 130,
      firstClass: 195,
    },
    availability: {
      economy: 50,
      business: 25,
      firstClass: 10,
    },
  },
  {
    id: '5',
    name: 'Silver Meteor',
    number: 'SM-505',
    from: stations[8],
    to: stations[4],
    departureTime: '19:30',
    arrivalTime: '22:15',
    duration: '2h 45m',
    price: {
      economy: 65,
      business: 115,
      firstClass: 180,
    },
    availability: {
      economy: 38,
      business: 16,
      firstClass: 4,
    },
  },
  {
    id: '6',
    name: 'Acela Express',
    number: 'AE-606',
    from: stations[8],
    to: stations[0],
    departureTime: '06:30',
    arrivalTime: '09:45',
    duration: '3h 15m',
    price: {
      economy: 120,
      business: 195,
      firstClass: 280,
    },
    availability: {
      economy: 32,
      business: 24,
      firstClass: 12,
    },
  },
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'New York City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience the vibrant culture and iconic landmarks of the Big Apple.',
    popular: true,
  },
  {
    id: '2',
    name: 'Chicago',
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1000&auto=format&fit=crop',
    description: 'Discover the architectural wonders and lakefront beauty of the Windy City.',
    popular: true,
  },
  {
    id: '3',
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1000&auto=format&fit=crop',
    description: 'Bask in the sunshine and glamour of the entertainment capital of the world.',
    popular: false,
  },
  {
    id: '4',
    name: 'Boston',
    image: 'https://images.unsplash.com/photo-1501979376754-f46af1f8ad83?q=80&w=1000&auto=format&fit=crop',
    description: 'Walk through history in America\'s revolutionary city with charming neighborhoods.',
    popular: false,
  },
  {
    id: '5',
    name: 'Seattle',
    image: 'https://images.unsplash.com/photo-1534311869523-626022863bde?q=80&w=1000&auto=format&fit=crop',
    description: 'Enjoy the perfect blend of urban innovation and natural beauty in the Emerald City.',
    popular: true,
  },
  {
    id: '6',
    name: 'Washington DC',
    image: 'https://images.unsplash.com/photo-1622748055889-0c4a3f8eafae?q=80&w=1000&auto=format&fit=crop',
    description: 'Tour the capital's impressive monuments and world-class museums.',
    popular: true,
  },
];

export const getClassLabel = (classType: ClassType): string => {
  switch (classType) {
    case 'economy':
      return 'Economy';
    case 'business':
      return 'Business';
    case 'firstClass':
      return 'First Class';
    default:
      return '';
  }
};

export const generateSeats = (classType: ClassType, train: Train): any[] => {
  const seats = [];
  const availability = train.availability[classType];
  const price = train.price[classType];
  
  const coachPrefix = classType === 'economy' ? 'E' : classType === 'business' ? 'B' : 'F';
  const seatsPerCoach = classType === 'economy' ? 40 : classType === 'business' ? 20 : 12;
  const coachCount = Math.ceil(availability / seatsPerCoach);
  
  for (let coach = 1; coach <= coachCount; coach++) {
    const coachLabel = `${coachPrefix}${coach}`;
    const seatCount = coach === coachCount ? availability % seatsPerCoach || seatsPerCoach : seatsPerCoach;
    
    for (let seat = 1; seat <= seatCount; seat++) {
      seats.push({
        id: `${train.id}-${coachLabel}-${seat}`,
        number: seat.toString().padStart(2, '0'),
        coach: coachLabel,
        classType,
        status: 'available',
        price,
      });
    }
  }
  
  return seats;
};

export const searchTrains = (
  from: string,
  to: string,
  date: Date,
): Train[] => {
  // Filter trains based on from and to stations
  return trains.filter(
    (train) => 
      (train.from.id === from || train.from.code === from || train.from.name.includes(from)) && 
      (train.to.id === to || train.to.code === to || train.to.name.includes(to))
  );
};

export const findStations = (query: string): Station[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return stations.filter(
    (station) => 
      station.name.toLowerCase().includes(lowerQuery) || 
      station.code.toLowerCase().includes(lowerQuery) || 
      station.city.toLowerCase().includes(lowerQuery)
  );
};
