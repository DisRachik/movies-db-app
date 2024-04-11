import { fetchNextPage } from "../../redux/reducers/movies";
import { MovieCard } from "./MovieCard";

import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks";
import { useAppSelector } from "../../hooks/useAppDispatch";

function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePage = useAppSelector((state) => state.movies.hasMorePage);

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  const { targetRef, entry } = useIntersectionObserver();

  useEffect(() => {
    entry?.isIntersecting && hasMorePage && dispatch(fetchNextPage());
  }, [dispatch, entry?.isIntersecting, hasMorePage]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>

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
      <div ref={targetRef}>{loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
    </Container>
  );
}

export default Movies;
