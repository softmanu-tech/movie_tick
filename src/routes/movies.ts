import { Hono } from 'hono'
import { movies } from '../data/movies'

export const moviesRoute = new Hono()

// Get all movies
moviesRoute.get('/', (c) => {
  return c.json(movies)
})

// Get movie by ID
moviesRoute.get('/:id', (c) => {
  const id = c.req.param('id')
  const movie = movies.find(m => m.id === id)
  
  if (!movie) {
    return c.json({ error: 'Movie not found' }, 404)
  }
  
  return c.json(movie)
})