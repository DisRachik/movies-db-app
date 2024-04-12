import { client, MoviesFilters } from "../../api";
import { ActionWithPayload, createReducer } from "../utils";
import { AppThunk } from "../store";
import { genres } from "../../features/Movies/genres";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface MoviesState {
  top: Movie[];
  loading: boolean;
  page: number;
  hasMorePage: boolean;
  genres: Genre[];
}

const initialState: MoviesState = {
  top: [],
  loading: false,
  page: 0,
  hasMorePage: true,
  genres,
};

const moviesLoaded = (movies: Movie[], page: number, hasMorePage: boolean) => ({
  type: "movies/loaded",
  payload: { movies, page, hasMorePage },
});

const moviesLoading = () => ({
  type: "movies/loading",
});

export function resetMovies() {
  return {
    type: "movies/reset",
  };
}

export function fetchNextPage(filters: MoviesFilters = {}): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage, filters));
  };
}

function fetchPage(pageNumber: number, filters: MoviesFilters): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(moviesLoading());

    const config = await client.getConfiguration();
    const imgUrl = config.images.base_url;
    const { results, page, totalPages } = await client.getMovies(pageNumber, filters);

    const mappedResult: Movie[] = results.map((item) => ({
      ...item,
      image: item.backdrop_path ? `${imgUrl}w780${item.backdrop_path}` : undefined,
    }));

    const hasMorePage = page < totalPages;

    dispatch(moviesLoaded(mappedResult, pageNumber, hasMorePage));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loaded": (
    state,
    action: ActionWithPayload<{ movies: Movie[]; page: number; hasMorePage: boolean }>
  ) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePage: action.payload.hasMorePage,
      loading: false,
    };
  },
  "movies/loading": (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  "movies/reset": () => ({ ...initialState }),
});

export default moviesReducer;
