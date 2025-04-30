import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

// 1. Define proper types
interface Booking {
  id: string
  movieId: string
  showtimeId: string
  seats: string[]
  name: string
  email: string
  totalPrice: number
  createdAt: string
  status: 'confirmed' | 'cancelled'
}

type BookingResponse = {
  success: boolean
  bookingId?: string
  booking?: Booking
  error?: string
  message?: string
}

// 2. Initialize Map with proper types
const bookings = new Map<string, Booking>()

// 3. Zod schema remains the same
const bookingSchema = z.object({
  movieId: z.string(),
  showtimeId: z.string(),
  seats: z.array(z.string()),
  name: z.string(),
  email: z.string().email(),
  totalPrice: z.number().positive()
})
type BookingInput = z.infer<typeof bookingSchema>
interface Booking extends BookingInput {
  id: string
  createdAt: string
  status: 'confirmed' | 'cancelled'
}

export const bookingRoute = new Hono()

// 4. Create booking with proper typing
bookingRoute.post(
  '/',
  zValidator('json', bookingSchema),
  async (c) => {
    const bookingData = c.req.valid('json')
    const bookingId = generateBookingId()
    
    const booking: Booking = {
      id: bookingId,
      movieId: bookingData.movieId,       
      showtimeId: bookingData.showtimeId, 
      seats: bookingData.seats,           
      name: bookingData.name,             
      email: bookingData.email,           
      totalPrice: bookingData.totalPrice, 
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    }
    
    bookings.set(bookingId, booking)
    
    const response: BookingResponse = {
      success: true,
      bookingId,
      booking
    }
    
    return c.json(response, 201)
  }
)

// 5. Get booking with proper error response
bookingRoute.get('/:id', async (c) => {
  const id = c.req.param('id')
  const booking = bookings.get(id)
  
  if (!booking) {
    return c.json({ success: false, error: 'Booking not found' } as BookingResponse, 404)
  }
  
  return c.json({ success: true, booking } as BookingResponse)
})

// 6. Cancel booking with proper typing
bookingRoute.delete('/:id', async (c) => {
  const id = c.req.param('id')
  
  if (!bookings.has(id)) {
    return c.json({ success: false, error: 'Booking not found' } as BookingResponse, 404)
  }
  
  // Mark as cancelled rather than deleting
  const booking = bookings.get(id)!
  bookings.set(id, { ...booking, status: 'cancelled' })
  
  return c.json({ 
    success: true,
    message: 'Booking cancelled'
  } as BookingResponse)
})

// 7. Get user bookings with proper date comparison
bookingRoute.get('/user/:email', async (c) => {
  const email = c.req.param('email')
  
  const userBookings = Array.from(bookings.values())
    .filter(booking => booking.email === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  return c.json({ success: true, bookings: userBookings })
})

// 8. Helper function remains the same
function generateBookingId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}