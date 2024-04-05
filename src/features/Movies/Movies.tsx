import { connect } from 'react-redux';
import { Movie } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import styles from './Movies.module.scss';
import { useEffect, useState } from 'react';
import { client, MovieDetails } from '../../api';

export function MoviesFetch() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    async function loadData() {
      const config = await client.getConfiguration();
      const imgUrl = config.images.base_url;
      const results = await client.getNowPlaying();

      const mappedResult: Movie[] = results.map((item) => ({
        ...item,
        image: item.backdrop_path ? `${imgUrl}w780${item.backdrop_path}` : undefined,
      }));

      setMovies(mappedResult);
    }

    loadData();
  }, []);

  return <Movies movies={movies} />;
}

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
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
