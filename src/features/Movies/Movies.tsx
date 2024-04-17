import { useCallback, useContext, useState } from "react";

import MovieCard from "./MovieCard";
import { MoviesFilter } from "./MoviesFilter";

import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks";
import {
  MoviesFilters,
  MoviesQuery,
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from "../../api/tmdbApi";

const initialQuery: MoviesQuery = {
  pageNumber: 1,
  filters: {},
};

function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];
  const hasMorePage = data?.hasMorePages;

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePage) {
      setQuery((prevState) => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
    }
  }, [hasMorePage]);

  const { targetRef } = useIntersectionObserver({ onIntersect });

  const formatImgUrl = (path?: string) =>
    path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;

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
            const moviesFilters: MoviesFilters = {
              keywords: filter.keywords.map((item) => item.id),
              genres: filter.genres,
            };
            setQuery({
              pageNumber: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && (
            <Typography variant="h6">No movies were found that match your query.</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map(({ id, title, overview, popularity, backdrop_path }, index) => (
              <Grid item key={`${id}-${index}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={id}
                  title={title}
                  overview={overview}
                  popularity={popularity}
                  image={formatImgUrl(backdrop_path)}
                  enableUserAction={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Movies;
