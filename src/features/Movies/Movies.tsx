import { connect } from 'react-redux';
import { Movie, fetchMovies } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import styles from './Movies.module.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <section>
      {loading ? (
        <h3>Loading... Must wait...</h3>
      ) : (
        <div className={styles.list}>
          {movies.map(({ id, title, overview, popularity, image }) => (
            <MovieCard
              key={id}
              id={id}
              title={title}
              overview={overview}
              popularity={popularity}
              image={image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});
const connector = connect(mapStateToProps);
export default connector(Movies);
