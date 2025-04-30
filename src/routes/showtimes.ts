import { Hono } from 'hono'
import { showtimes } from '../data/showtimes'
import { ShowTime } from '@/types'

export const showtimesRoute = new Hono()

// Get all showtimes
showtimesRoute.get('/', (c) => {
  return c.json(showtimes)
})

// Get showtimes for a specific movie
showtimesRoute.get('/movie/:movieId', (c) => {
  const movieId = c.req.param('movieId')
  const movieShowtimes = showtimes.filter(s => s.movieId === movieId)
  
  return c.json(movieShowtimes)
})

// Get showtime by ID
showtimesRoute.get('/:id', (c) => {
  const id = c.req.param('id')
  const showtime = showtimes.find(s => s.id === id)
  
  if (!showtime) {
    return c.json({ error: 'Showtime not found' }, 404)
  }
  
  return c.json(showtime)
})

// Get available seats for a showtime
showtimesRoute.get('/:id/seats', (c) => {
  const id = c.req.param('id')
  const showtime = showtimes.find(s => s.id === id)
  
  if (!showtime) {
    return c.json({ error: 'Showtime not found' }, 404)
  }
  
  // In a real app, you would query the database for seat availability
  // This is a mock implementation
  const seats = generateSeatsForShowtime(showtime)
  
  return c.json(seats)
})

// Helper function to generate seats (mock)
function generateSeatsForShowtime(showtime: ShowTime) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const seatsPerRow = 12
  const seats = []
  
  for (const row of rows) {
    for (let number = 1; number <= seatsPerRow; number++) {
      seats.push({
        id: `${row}-${number}`,
        row,
        number,
        status: Math.random() > 0.7 ? 'booked' : 'available' // 30% chance of being booked
      })
    }
  }
  
  return seats
}