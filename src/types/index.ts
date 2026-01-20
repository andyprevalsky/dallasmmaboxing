export interface ClassSchedule {
  id: string
  name: string
  discipline: 'Boxing' | 'Muay Thai' | 'MMA' | 'Brazilian Jiu-Jitsu'
  instructor: string
  day: string
  time: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  duration: number
}

export interface ClassInfo {
  title: string
  description: string
  benefits: string[]
  imageUrl?: string
}

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  specialties: string[]
  imageUrl?: string
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: 'monthly' | 'quarterly' | 'annual'
  features: string[]
  popular?: boolean
}
