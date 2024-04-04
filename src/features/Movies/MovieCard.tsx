import { Link } from 'react-router-dom';
import { Movie } from '../../reducers/movies';

import styles from './MovieCard.module.scss';

export function MovieCard({ id, title, overview, rating }: Movie) {
  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src="/movie-thumb.png" alt="Movie thumbnail" />
      <div className={styles.content}>
        <Link to={`/movies/${id}`}>{title}</Link>
        <p className={styles.overview}>{overview}</p>
        <p className={styles.rate}>{rating}</p>
      </div>
    </div>
  );
}
