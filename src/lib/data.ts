import { ClassType, Destination, Station, Train } from './types';

export const stations: Station[] = [
  { id: '1', name: 'New Delhi Railway Station', code: 'NDLS', city: 'Delhi' },
  { id: '2', name: 'Mumbai Central', code: 'BCT', city: 'Mumbai' },
  { id: '3', name: 'Howrah Junction', code: 'HWH', city: 'Kolkata' },
  { id: '4', name: 'Chennai Central', code: 'MAS', city: 'Chennai' },
  { id: '5', name: 'Bengaluru City Junction', code: 'SBC', city: 'Bengaluru' },
  { id: '6', name: 'Ahmedabad Junction', code: 'ADI', city: 'Ahmedabad' },
  { id: '7', name: 'Pune Junction', code: 'PUNE', city: 'Pune' },
  { id: '8', name: 'Hyderabad Deccan', code: 'HYB', city: 'Hyderabad' },
  { id: '9', name: 'Jaipur Junction', code: 'JP', city: 'Jaipur' },
  { id: '10', name: 'Lucknow Junction', code: 'LJN', city: 'Lucknow' },
];

export const trains: Train[] = [
  {
    id: '1',
    name: 'Rajdhani Express',
    number: '12951',
    from: stations[0],
    to: stations[1],
    departureTime: '16:25',
    arrivalTime: '08:15',
    duration: '15h 50m',
    price: {
      economy: 1290,
      business: 2450,
      firstClass: 4210,
    },
    availability: {
      economy: 120,
      business: 40,
      firstClass: 18,
    },
  },
  {
    id: '2',
    name: 'Shatabdi Express',
    number: '12001',
    from: stations[0],
    to: stations[9],
    departureTime: '06:15',
    arrivalTime: '12:30',
    duration: '6h 15m',
    price: {
      economy: 780,
      business: 1550,
      firstClass: 2750,
    },
    availability: {
      economy: 180,
      business: 62,
      firstClass: 15,
    },
  },
  {
    id: '3',
    name: 'Duronto Express',
    number: '12213',
    from: stations[2],
    to: stations[0],
    departureTime: '08:30',
    arrivalTime: '21:35',
    duration: '13h 05m',
    price: {
      economy: 1150,
      business: 2275,
      firstClass: 3890,
    },
    availability: {
      economy: 95,
      business: 38,
      firstClass: 16,
    },
  },
  {
    id: '4',
    name: 'Vande Bharat Express',
    number: '22439',
    from: stations[0],
    to: stations[8],
    departureTime: '06:40',
    arrivalTime: '13:05',
    duration: '6h 25m',
    price: {
      economy: 1350,
      business: 2550,
      firstClass: 3945,
    },
    availability: {
      economy: 150,
      business: 75,
      firstClass: 20,
    },
  },
  {
    id: '5',
    name: 'Tejas Express',
    number: '22119',
    from: stations[1],
    to: stations[6],
    departureTime: '17:50',
    arrivalTime: '21:40',
    duration: '3h 50m',
    price: {
      economy: 760,
      business: 1570,
      firstClass: 2480,
    },
    availability: {
      economy: 88,
      business: 46,
      firstClass: 14,
    },
  },
  {
    id: '6',
    name: 'Tamil Nadu Express',
    number: '12621',
    from: stations[0],
    to: stations[3],
    departureTime: '22:30',
    arrivalTime: '07:15',
    duration: '8h 45m',
    price: {
      economy: 1120,
      business: 2195,
      firstClass: 3680,
    },
    availability: {
      economy: 102,
      business: 54,
      firstClass: 12,
    },
  },
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience the perfect blend of history and modernity in India\'s capital city.',
    popular: true,
  },
  {
    id: '2',
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop',
    description: 'Discover the bustling financial capital and home to Bollywood.',
    popular: true,
  },
  {
    id: '3',
    name: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop',
    description: 'Explore the cultural hub known for its literature, art, and colonial architecture.',
    popular: false,
  },
  {
    id: '4',
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop',
    description: 'Visit the gateway to South India with its vibrant Tamil culture and beautiful beaches.',
    popular: false,
  },
  {
    id: '5',
    name: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience the Silicon Valley of India with its pleasant climate and tech innovation.',
    popular: true,
  },
  {
    id: '6',
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046929-e3726dd6d327?q=80&w=1000&auto=format&fit=crop',
    description: 'Tour the Pink City with its magnificent palaces, forts, and vibrant culture.',
    popular: true,
  },
];

export const getClassLabel = (classType: ClassType): string => {
  switch (classType) {
    case 'economy':
      return 'Sleeper Class';
    case 'business':
      return 'AC 3 Tier';
    case 'firstClass':
      return 'AC First Class';
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
