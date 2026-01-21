import { ClassSchedule, MembershipPlan } from '../types'

export const SITE_NAME = 'George Prevalsky Gym'
export const SITE_TAGLINE = 'Boxing, Muay Thai, Brazilian Jiu-Jitsu and MMA'

export const CONTACT_INFO = {
  address: '612 Valley Ranch Pkwy S',
  city: 'Irving',
  state: 'Texas',
  zip: '75063',
  phone: '972-977-5605',
  email: 'georgeprevalsky@gmail.com',
  fullAddress: '612 Valley Ranch Pkwy S, Irving, Texas 75063',
}

export const SOCIAL_MEDIA = {
  facebook: 'https://www.facebook.com/dallasmmaboxing',
  instagram: 'https://www.instagram.com/dallasmmaboxing',
  yelp: 'https://www.yelp.com/biz/dallas-mma-boxing',
}

export const GYM_INFO = {
  established: 1996,
  yearsTeaching: 20,
  facilitySize: '6,000 sq ft',
  location: 'DFW Area',
  mission: 'Your Success is Our Goal',
  description: 'A Muay Thai and Boxing Gym located in the center of the DFW area. Founded in 1996, we have maintained continuous operations for over two decades, serving both competitive and recreational athletes.',
}

export const OPERATING_HOURS = {
  monday: { open: '5:30 PM', close: '9:15 PM' },
  tuesday: { open: '11:30 AM', close: '9:15 PM' },
  wednesday: { open: '5:30 PM', close: '9:15 PM' },
  thursday: { open: '11:30 AM', close: '9:15 PM' },
  friday: { open: '5:30 PM', close: '7:45 PM' },
  saturday: { open: '9:30 AM', close: '2:30 PM' },
  sunday: 'Closed',
}

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Boxing', path: '/boxing' },
  { name: 'Muay Thai', path: '/muay-thai' },
  { name: 'MMA', path: '/mma' },
  { name: 'Wrestling', path: '/wrestling' },
  { name: 'Brazilian Jiu-Jitsu', path: '/brazilian-jiu-jitsu' },
]

export const SAMPLE_SCHEDULES: ClassSchedule[] = [
  {
    id: '1',
    name: 'Morning Boxing',
    discipline: 'Boxing',
    instructor: 'John Smith',
    day: 'Monday',
    time: '6:00 AM',
    level: 'All Levels',
    duration: 60,
  },
  {
    id: '2',
    name: 'Muay Thai Fundamentals',
    discipline: 'Muay Thai',
    instructor: 'Sarah Johnson',
    day: 'Tuesday',
    time: '7:00 PM',
    level: 'Beginner',
    duration: 60,
  },
  {
    id: '3',
    name: 'Advanced MMA',
    discipline: 'MMA',
    instructor: 'Mike Davis',
    day: 'Wednesday',
    time: '8:00 PM',
    level: 'Advanced',
    duration: 90,
  },
]

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    duration: 'monthly',
    features: [
      'Access to all group classes',
      'Use of training equipment',
      'Locker room access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 149,
    duration: 'monthly',
    features: [
      'Everything in Basic',
      '2 personal training sessions/month',
      'Guest pass (2/month)',
      'Nutrition consultation',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 249,
    duration: 'monthly',
    features: [
      'Everything in Pro',
      '4 personal training sessions/month',
      'Unlimited guest passes',
      'Priority class registration',
      'Competition preparation coaching',
    ],
  },
]
