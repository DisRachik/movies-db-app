import { useCallback, useContext, useEffect, useState } from "react";

import { fetchNextPage, resetMovies } from "../../redux/reducers/movies";
import MovieCard from "./MovieCard";
import { Filters, MoviesFilter } from "./MoviesFilter";

import { useAppDispatch, useAppSelector, useIntersectionObserver } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";

function Movies() {
  const [filters, setFilters] = useState<Filters>();
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePage = useAppSelector((state) => state.movies.hasMorePage);

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  const { targetRef, entry } = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePage) {
      const moviesFilters = filters
        ? {
            keywords: filters?.keywords.map((item) => item.id),
            genres: filters?.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePage]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `In process! Action: ${auth.user.name} is trying to add movie${id} to his favorite list.`
      );
    },
    [auth.user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <MoviesFilter
          onApply={(filter) => {
            dispatch(resetMovies());
            setFilters(filter);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!loading && !movies.length && (
            <Typography variant="h6">No movies were found that match your query.</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map(({ id, title, overview, popularity, image }, index) => (
              <Grid item key={`${id}-${index}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={id}
                  title={title}
                  overview={overview}
                  popularity={popularity}
                  image={image}
                  enableUserAction={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Movies;
