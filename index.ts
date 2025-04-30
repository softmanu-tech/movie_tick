import app from './app'

const port = parseInt(process.env.PORT || '3000', 10)

const server = Bun.serve({
  port,
  fetch: app.fetch,
  // Optional error handler
  error(error) {
    console.error('Server error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})

console.log(`Server running at http://${server.hostname}:${server.port}`)

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('Shutting down server...')
  server.stop()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Shutting down server...')
  server.stop()
  process.exit(0)
})