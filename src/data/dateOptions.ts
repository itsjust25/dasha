import type { DateOption } from '../types';

export const dateOptions: DateOption[] = [
    {
        id: 'picnic',
        title: 'Picnic Date',
        image: '/assets/picnic_date.png',
        locations: ['Quezon City Circle', 'UP Town', 'Valenzuela Park', 'Philippine Arena'],
        hasOwnFood: true,
    },
    {
        id: 'mall',
        title: 'Mall Date',
        image: '/assets/mall_date.png',
        locations: ['MOA', 'SM North'],
        activities: ['Arcade', 'Bowling'],
        foodOptions: ['Food Court', 'Restaurant', 'Cafe'],
    },
    {
        id: 'coffee',
        title: 'Coffee Date Ride',
        image: '/assets/coffee_ride.png',
        locations: ['Antipolo', 'Angono', 'Tanay', 'Other Rizal Area'],
        foodOptions: ['Coffee & Pastries', 'Brunch', 'Light Snacks'],
    },
    {
        id: 'staycation',
        title: 'Staycation Day Tour',
        image: '/assets/staycation.png',
        locations: ['TBD - Your Choice!'],
        foodOptions: ['We cook together', 'Order delivery', 'Meal prep'],
    },
    {
        id: 'manila',
        title: 'Manila Date',
        image: '/assets/manila_date.png',
        locations: ['Museum', 'Intramuros'],
        foodOptions: ['Binondo Food Trip', 'Local Restaurant', 'Street Food'],
    },
    {
        id: 'foodtrip',
        title: 'Samgyupsal / Unli Wings',
        image: '/assets/food_trip.png',
        locations: ['Maginhawa', 'Tomas Morato', 'Kapitolyo'],
        foodOptions: ['Samgyupsal', 'Unli Wings'],
    },
    {
        id: 'custom',
        title: 'Your Suggestion',
        image: '/assets/custom_date.png',
        locations: ['Custom Location'],
        customInput: true,
    },
];
