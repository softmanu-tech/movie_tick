import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { bookingRoute } from './src/routes/booking'
import { moviesRoute } from './src/routes/movies'
import { showtimesRoute } from './src/routes/showtimes'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// Health check endpoint
app.get('/', (c) => c.json({ message: 'Movie Booking API' }))

// Routes
app.route('/api/bookings', bookingRoute)
app.route('/api/movies', moviesRoute)
app.route('/api/showtimes', showtimesRoute)

// Error handling
app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app