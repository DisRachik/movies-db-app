import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Configuration {
  images: {
    base_url: string;
  };
}

interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
}

interface MoviesState {
  results: MovieDetails[];
  currentPage: number;
  hasMorePages: boolean;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

export interface MoviesQuery {
  pageNumber: number;
  filters: MoviesFilters;
}

export interface KeywordItem {
  id: number;
  name: string;
}

interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

export const tmdbAPI = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => "/configuration",
    }),

    getNowPlaying: builder.query<MoviesState, number>({
      query: (pageNumber = 1) => `/movie/now_playing?page=${pageNumber}`,
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => {
        const { results, page: currentPage, total_pages } = response;
        const hasMorePages = arg < total_pages;

        return { results, currentPage, hasMorePages };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.currentPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.currentPage = responseData.currentPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.pageNumber.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append("with_keywords", moviesQuery.filters.keywords.join("|"));
        }
        if (moviesQuery.filters.genres?.length) {
          params.append("with_genres", moviesQuery.filters.genres.join(","));
        }

        return `/discover/movie?${params.toString()}`;
      },
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => {
        const { results, page: currentPage, total_pages } = response;
        const hasMorePages = arg.pageNumber < total_pages;

        return { results, currentPage, hasMorePages };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.currentPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.currentPage = responseData.currentPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getKeywords: builder.query<KeywordItem[], string>({
      query: (query) => `/search/keyword?query=${query}`,
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),

    getGenres: builder.query<Genre[], void>({
      query: () => "/genre/movie/list",
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useGetNowPlayingQuery,
  useGetMoviesQuery,
  useGetKeywordsQuery,
  useGetGenresQuery,
} = tmdbAPI;
