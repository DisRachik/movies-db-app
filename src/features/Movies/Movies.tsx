import { connect, useDispatch } from 'react-redux';
import { Movie, moviesLoader } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import styles from './Movies.module.scss';
import { useEffect } from 'react';
import { client, MovieDetails } from '../../api';

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
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
      <h1>MOVIES</h1>
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
    </section>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});
const connector = connect(mapStateToProps);
export default connector(Movies);
