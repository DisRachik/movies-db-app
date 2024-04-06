import { connect } from 'react-redux';
import { Movie, fetchMovies } from '../../reducers/movies';
import { RootState } from '../../store';
import { MovieCard } from './MovieCard';

import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';

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
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>

      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map(({ id, title, overview, popularity, image }) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <MovieCard
                id={id}
                title={title}
                overview={overview}
                popularity={popularity}
                image={image}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});
const connector = connect(mapStateToProps);
export default connector(Movies);
