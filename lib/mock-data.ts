export interface Child {
  id: string
  name: string
  age: number
  avatar: string
  deviceId: string
  isOnline: boolean
  location: {
    lat: number
    lng: number
    address: string
    lastUpdated: Date
  }
  screenTime: {
    today: number // minutes
    thisWeek: number // minutes
    limit: number // minutes per day
  }
  safetyScore: number
}

export interface ScreenTimeEntry {
  id: string
  childId: string
  app: string
  website?: string
  category: "educational" | "entertainment" | "social" | "gaming" | "other"
  duration: number // minutes
  timestamp: Date
  blocked: boolean
}

export interface Alert {
  id: string
  childId: string
  type: "suspicious_contact" | "cyberbullying" | "inappropriate_content" | "screen_time" | "location"
  severity: "low" | "medium" | "high"
  title: string
  description: string
  timestamp: Date
  resolved: boolean
}

export interface CommunityReport {
  id: string
  reporterId: string
  reporterName: string
  type: "suspicious_person" | "inappropriate_content" | "cyberbullying" | "other"
  description: string
  location?: string
  timestamp: Date
  verified: boolean
  upvotes: number
}

export const mockChildren: Child[] = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 12,
    avatar: "/young-woman-smiling.png",
    deviceId: "device-001",
    isOnline: true,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "Lincoln Elementary School, New York, NY",
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    screenTime: {
      today: 180, // 3 hours
      thisWeek: 1260, // 21 hours
      limit: 240, // 4 hours per day
    },
    safetyScore: 92,
  },
  {
    id: "2",
    name: "Alex Johnson",
    age: 9,
    avatar: "/young-boy-drawing.png",
    deviceId: "device-002",
    isOnline: false,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: "Home - 123 Main St, New York, NY",
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    },
    screenTime: {
      today: 120, // 2 hours
      thisWeek: 840, // 14 hours
      limit: 180, // 3 hours per day
    },
    safetyScore: 78,
  },
]

export const mockScreenTimeData: ScreenTimeEntry[] = [
  {
    id: "1",
    childId: "1",
    app: "Khan Academy",
    website: "khanacademy.org",
    category: "educational",
    duration: 45,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    blocked: false,
  },
  {
    id: "2",
    childId: "1",
    app: "YouTube",
    website: "youtube.com",
    category: "entertainment",
    duration: 30,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    blocked: false,
  },
  {
    id: "3",
    childId: "2",
    app: "Minecraft",
    category: "gaming",
    duration: 60,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    blocked: true,
  },
  {
    id: "4",
    childId: "1",
    app: "Instagram",
    website: "instagram.com",
    category: "social",
    duration: 25,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    blocked: false,
  },
  {
    id: "5",
    childId: "2",
    app: "Scratch",
    website: "scratch.mit.edu",
    category: "educational",
    duration: 40,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    blocked: false,
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    childId: "1",
    type: "suspicious_contact",
    severity: "high",
    title: "Unknown Contact Attempt",
    description: "Emma received a message from an unknown number asking for personal information.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    resolved: false,
  },
  {
    id: "2",
    childId: "2",
    type: "screen_time",
    severity: "medium",
    title: "Screen Time Limit Exceeded",
    description: "Alex has exceeded the daily screen time limit by 30 minutes.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    resolved: false,
  },
  {
    id: "3",
    childId: "1",
    type: "inappropriate_content",
    severity: "medium",
    title: "Blocked Content Access",
    description: "Attempted access to age-inappropriate website was blocked.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    resolved: true,
  },
]

export const mockCommunityReports: CommunityReport[] = [
  {
    id: "1",
    reporterId: "user-123",
    reporterName: "Sarah M.",
    type: "suspicious_person",
    description: "Suspicious individual approaching children near Lincoln Elementary School playground.",
    location: "Lincoln Elementary School, New York, NY",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    verified: true,
    upvotes: 12,
  },
  {
    id: "2",
    reporterId: "user-456",
    reporterName: "Mike R.",
    type: "cyberbullying",
    description: "Reports of cyberbullying incidents on popular gaming platform targeting local children.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    verified: false,
    upvotes: 7,
  },
  {
    id: "3",
    reporterId: "user-789",
    reporterName: "Lisa K.",
    type: "inappropriate_content",
    description: "Inappropriate advertisements appearing on children's educational apps.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    verified: true,
    upvotes: 15,
  },
]
