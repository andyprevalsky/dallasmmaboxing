import { ClassSchedule, MembershipPlan } from '../types'

export const SITE_NAME = 'Dallas MMA Boxing'
export const SITE_TAGLINE = 'Premier Martial Arts Training in Dallas, Texas'

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Boxing', path: '/boxing' },
  { name: 'Muay Thai', path: '/muay-thai' },
  { name: 'MMA', path: '/mma' },
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
