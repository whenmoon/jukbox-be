export interface User {
  _id: string
  email: string
  name: string
  diamonds: number
}

export interface UserVenue {
  tickets: number
  diamonds: number
}

export interface Venue {
  ticket_default_no: number
  closing_times: ClosingTimes
}

export interface ClosingTimes {
  Monday: string
  Tuesday: string
  Wednesday: string
  Thursday: string
  Friday: string
  Saturday: string
  Sunday: string
}
