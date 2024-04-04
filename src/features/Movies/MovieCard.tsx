import { Link } from 'react-router-dom';
import { Movie } from '../../reducers/movies';

export function MovieCard({ id, title, overview, rating }: Movie) {
  return (
    <div className="Movies-card">
      <Link to={`/movies/${id}`}>{title}</Link>
      <p className="Movies-card-overview">{overview}</p>
      <p className="Movies-card-rate">{rating}</p>
    </div>
  );
}
