import { connect, useDispatch } from 'react-redux';
import { Movie, moviesLoader, moviesLoading } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import styles from './Movies.module.scss';
import { useEffect } from 'react';
import { client } from '../../api';

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      dispatch(moviesLoading());

      const config = await client.getConfiguration();
      const imgUrl = config.images.base_url;
      const results = await client.getNowPlaying();

      const mappedResult: Movie[] = results.map((item) => ({
        ...item,
        image: item.backdrop_path ? `${imgUrl}w780${item.backdrop_path}` : undefined,
      }));

      dispatch(moviesLoader(mappedResult));
    }

    loadData();
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
