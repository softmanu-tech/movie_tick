
import { Movie } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card group h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full aspect-[2/3] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <Link to={`/movie/${movie.id}`}>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-card p-4 flex-1 flex flex-col rounded-b-lg">
        <Link to={`/movie/${movie.id}`} className="hover:text-primary">
          <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        </Link>
        <div className="flex items-center space-x-2 mt-2 text-muted-foreground text-sm">
          <Clock className="h-4 w-4" />
          <span>{movie.duration} min</span>
          <Star className="h-4 w-4 ml-2" />
          <span>{movie.rating}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {movie.genre.map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
