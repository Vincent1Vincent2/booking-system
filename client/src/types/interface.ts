export interface User {
  email: string;
  password: string;
  verified: boolean;
  archived: boolean;
  admin: boolean;
  bookings: Booking[];
  createdAt: Date;
}

export interface Booking {
  id: number;
  date: Date;
  userId: number;
  roomId: number;
  user: User;
  room: Room;
  archived: boolean;
}

export interface Room {
  id: number;
  name: string;
  description?: string;
  capacity?: number;
  status: string;
  type?: string;
  bookings: Booking[];
  createdAt: Date;
  updatedAt: Date;
}
