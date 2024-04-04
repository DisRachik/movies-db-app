import { connect } from 'react-redux';
import { Movie } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import './Movies.css';

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <h1>MOVIES</h1>
      <div className="Movies-list">
        {movies.map(({ id, title, overview, rating }) => (
          <MovieCard key={id} id={id} title={title} overview={overview} rating={rating} />
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
