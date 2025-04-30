export interface ShowTime {
    id: string
    movieId: string
    date: string
    time: string
    theater: string
    price: number
  }
  
  export const showtimes: ShowTime[] = [
    {
      id: 's1',
      movieId: 'm1',
      date: '2025-05-15',
      time: '19:30',
      theater: 'Cineworld IMAX',
      price: 14.99
    },
    {
      id: 's2',
      movieId: 'm1',
      date: '2025-05-16',
      time: '20:00',
      theater: 'Starlight Cinemas',
      price: 12.99
    },
    {
      id: 's3',
      movieId: 'm2',
      date: '2025-05-20',
      time: '20:15',
      theater: 'Starlight Cinemas',
      price: 12.99
    }
    // Add more showtimes...
  ]