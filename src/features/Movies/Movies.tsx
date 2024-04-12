import { fetchNextPage, resetMovies } from "../../redux/reducers/movies";
import { MovieCard } from "./MovieCard";
import { Filters, MoviesFilter } from "./MoviesFilter";

import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks";
import { useAppSelector } from "../../hooks/useAppDispatch";

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
        ? { keywords: filters.keywords.map((item) => item.id) }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePage]);

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
          <Grid container spacing={4}>
            {movies.map(({ id, title, overview, popularity, image }) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <MovieCard
                  id={id}
                  title={title}
                  overview={overview}
                  popularity={popularity}
                  image={image}
                  enableUserAction={loggedIn}
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
